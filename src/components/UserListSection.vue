<template>
  <div class="user-list-container">
    <div class="user-list">
      <div class="user-list-header">
        <div
          v-for="column in columns"
          :key="column.key"
          class="header-cell"
          @click="sortBy(column.key)"
          :class="{ sortable: true, sorted: sortKey === column.key }"
        >
          {{ column.label }}
          <span class="sort-icon" v-if="sortKey === column.key">
            {{ sortOrder === 'asc' ? '↑' : '↓' }}
          </span>
        </div>
      </div>

      <div class="user-list-body">
        <div v-if="loading" class="loading-message">Loading users...</div>
        <div v-else-if="error" class="error-message">
          {{ error }}
        </div>
        <div
          v-else
          v-for="user in sortedUsers"
          :key="user.email"
          class="user-row"
          @click="openModal(user)"
        >
          <div class="user-cell">{{ formatDate(user.registered.date) }}</div>
          <div class="user-cell">{{ `${user.name.first} ${user.name.last}` }}</div>
          <div class="user-cell">{{ user.gender }}</div>
          <div class="user-cell">{{ user.location.country }}</div>
          <div class="user-cell">{{ user.email }}</div>
        </div>
      </div>
    </div>

    <UserDetails :user="selectedUser" :isVisible="isModalVisible" @close="closeModal" />

    <div class="refresh-container">
      <button class="btn btn-refresh" @click="refreshPage()">
        <span class="icon">↻</span>
        Refresh
      </button>
    </div>
  </div>
</template>

<script>
import UserDetails from './UserDetails.vue'

export default {
  name: 'UserListSection',
  components: {
    UserDetails,
  },
  data() {
    return {
      sortKey: 'name',
      sortOrder: 'asc',
      columns: [
        { key: 'date', label: 'Date' },
        { key: 'name', label: 'Name' },
        { key: 'gender', label: 'Gender' },
        { key: 'country', label: 'Country' },
        { key: 'email', label: 'Email' },
      ],
      page: 1,
      users: [],
      loading: false,
      error: null,
      selectedUser: { name: 'Test User', email: 'test@example.com' },
      isModalVisible: false,
    }
  },
  computed: {
    sortedUsers() {
      return [...this.users].sort((a, b) => {
        let valueA, valueB

        switch (this.sortKey) {
          case 'date':
            valueA = new Date(a.registered.date)
            valueB = new Date(b.registered.date)
            break
          case 'name':
            valueA = `${a.name.first} ${a.name.last}`.toLowerCase()
            valueB = `${b.name.first} ${b.name.last}`.toLowerCase()
            break
          case 'gender':
            valueA = a.gender.toLowerCase()
            valueB = b.gender.toLowerCase()
            break
          case 'country':
            valueA = a.location.country.toLowerCase()
            valueB = b.location.country.toLowerCase()
            break
          case 'email':
            valueA = a.email.toLowerCase()
            valueB = b.email.toLowerCase()
            break
          default:
            valueA = a[this.sortKey]
            valueB = b[this.sortKey]
        }

        if (valueA === valueB) return 0

        const comparison = valueA > valueB ? 1 : -1
        return this.sortOrder === 'asc' ? comparison : -comparison
      })
    },
  },
  methods: {
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortKey = key
        this.sortOrder = 'asc'
      }
    },
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(`https://randomuser.me/api/?page=${this.page}&results=10`)
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        const data = await response.json()
        this.users = data.results
        console.log('this.users', this.users)
      } catch (err) {
        this.error = 'Error loading users. Please try again.'
        console.error('Error:', err)
      } finally {
        this.loading = false
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    },
    capitalizeFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    refreshPage() {
      this.page += 1
      if (this.page > 5) {
        this.page = 1
      }
      this.fetchUsers()
    },
    openModal(user) {
      this.selectedUser = user
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
    },
  },
  mounted() {
    this.fetchUsers()
  },
}
</script>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.user-list-container {
  max-width: 1200px;
  margin: 1.5rem auto;
  padding: 0 1rem;
}

.user-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.user-list-header {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 1rem;
  border-bottom: 1px solid #eee;
  font-weight: 500;
  color: #666;
}

.user-list-body {
  display: flex;
  flex-direction: column;
}

.user-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 1rem;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.user-row:hover {
  background-color: #f9f9f9;
  border-color: #00bcd4;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-cell {
  font-size: 0.875rem;
  color: #333;
}

.loading-message,
.error-message {
  padding: 2rem;
  text-align: center;
  color: #666;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.refresh-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.btn-refresh {
  background-color: #00bcd4;
  color: white;
}

.btn-refresh:hover {
  background-color: #9bd0d7;
}

@media (max-width: 768px) {
  .user-list-header,
  .user-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .user-cell {
    padding: 0.25rem 0;
  }
}
</style>

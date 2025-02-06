<template>
  <div class="user-list-container">
    <div class="user-list">
      <div class="user-list-header">
        <div class="header-cell">Date</div>
        <div class="header-cell">Name</div>
        <div class="header-cell">Gender</div>
        <div class="header-cell">Country</div>
        <div class="header-cell">Email</div>
      </div>

      <div class="user-list-body">
        <div v-if="loading" class="loading-message">Loading users...</div>
        <div v-else-if="error" class="error-message">
          {{ error }}
        </div>
        <div v-else v-for="user in users" :key="user.email" class="user-row">
          <div class="user-cell">{{ formatDate(user.dob.date) }}</div>
          <div class="user-cell">{{ formatName(user.name) }}</div>
          <div class="user-cell">{{ user.gender }}</div>
          <div class="user-cell">{{ user.location.country }}</div>
          <div class="user-cell">{{ user.email }}</div>
        </div>
      </div>
    </div>

    <div class="refresh-container">
      <button class="btn btn-refresh">
        <span class="icon">↻</span>
        Refresh
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserListSection',
  data() {
    return {
      users: [],
      loading: false,
      error: null,
    }
  },
  methods: {
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch('https://randomuser.me/api/?results=20')
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
    formatName(nameData) {
      return nameData.first + ' ' + nameData.last
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
  background-color: #00acc1;
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

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
        <div v-for="user in users" :key="user.email" class="user-row">
          <div class="user-cell">{{ user.date }}</div>
          <div class="user-cell">{{ user.name }}</div>
          <div class="user-cell">{{ user.gender }}</div>
          <div class="user-cell">{{ user.country }}</div>
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
      users: [
        {
          date: '14 Sep 2022',
          name: 'Megan R. Johnson',
          gender: 'Male',
          country: 'Australia',
          email: 'meganjohnson@gmail.com',
        },
        {
          date: '14 Sep 2022',
          name: 'Oscar Barnes',
          gender: 'Male',
          country: 'Germany',
          email: 'oscarbarnes@gmail.com',
        },
        {
          date: '14 Sep 2022',
          name: 'Mateo Gilbert',
          gender: 'Male',
          country: 'New Zealand',
          email: 'mateogilbert@gmail.com',
        },
        {
          date: '14 Sep 2022',
          name: 'Rosalie Young',
          gender: 'Female',
          country: 'Australia',
          email: 'rosalieyoung@gmail.com',
        },
        {
          date: '14 Sep 2022',
          name: 'Blakely Patel',
          gender: 'Female',
          country: 'US',
          email: 'blakelypatel@gmail.com',
        },
        {
          date: '14 Sep 2022',
          name: 'Aniyah James',
          gender: 'Female',
          country: 'Indonesia',
          email: 'aniyahjames@gmail.com',
        },
        {
          date: '14 Sep 2022',
          name: 'Manuel Ward',
          gender: 'Male',
          country: 'Malaysia',
          email: 'manuelward@gmail.com',
        },
      ],
    }
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
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.user-row:hover {
  background-color: #f9f9f9;
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

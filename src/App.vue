<template>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <img :src="logoImage" alt="Kiratech-Logo" class="logo" />
      <div class="header-icons">
        <font-awesome-icon icon="bell" class="header-icon" />
        <font-awesome-icon icon="gear" class="header-icon" />
        <font-awesome-icon icon="right-from-bracket" class="header-icon" />
      </div>
    </header>

    <!-- Profile Section -->
    <div class="profile-section">
      <div class="profile-content">
        <div class="profile-image-container">
          <img :src="profileImage" alt="Profile" class="profile-image" />
        </div>
        <div class="profile-info">
          <div class="profile-header">
            <h1 class="profile-name">John Doe</h1>
            <span class="last-online">Last online: 2 days ago</span>
          </div>
          <div class="profile-actions">
            <button class="btn btn-primary">
              <span class="icon">✉</span>
              Send Message
            </button>
            <button class="btn btn-secondary">
              <span class="icon">+</span>
              Add Friend
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- User List Section -->
    <UserListSection />
  </div>
</template>

<script>
import logoImage from '@/assets/Logo.png'
import profileImage from '@/assets/Avatar.png'
import UserListSection from './components/UserListSection.vue'

export default {
  name: 'UserPage',
  components: {
    UserListSection,
  },
  data() {
    return {
      logoImage,
      profileImage,
    }
  },
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
}

.logo {
  width: 120px;
  margin-right: auto;
}

.header-icons {
  display: flex;
  align-items: center;
}

.header-icon {
  margin-left: 25px;
  font-size: 24px;
  color: #333;
  cursor: pointer;
}

.profile-section {
  background-color: #00bcd4;
  padding: 2rem;
  color: white;
}

.profile-content {
  display: flex;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.profile-image {
  width: 96px;
  height: 96px;
  border-radius: 8px;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.last-online {
  font-size: 0.875rem;
  opacity: 0.8;
}

.profile-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

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

.btn-primary {
  background-color: white;
  color: #00bcd4;
}

.btn-primary:hover {
  background-color: #f5f5f5;
}

.btn-secondary {
  background-color: transparent;
  border: 1px solid white;
  color: white;
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .profile-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-actions {
    justify-content: center;
  }
}
</style>

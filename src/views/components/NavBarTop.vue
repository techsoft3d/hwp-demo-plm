<template>
  <!-- Nav Start -->
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://www.techsoft3d.com">
        <img src="/images/TS3D_logo.jpg" alt="Tech Soft 3D" />
      </a>
    </div>
    <div class="navbar-end">
      <a
        class="navbar-item"
        href="http://pages.techsoft3d.com/evaluate"
        target="_blank"
        style="text-decoration: none; color: #0a95d5"
      >
        Trial
      </a>
      <a
        class="navbar-item"
        href="https://techsoft3d.com/industries/product-lifecycle-management/"
        target="_blank"
        style="text-decoration: none; color: #0a95d5"
      >
        Technology
      </a>
      <a
        class="navbar-item"
        href="https://techsoft3d.com/industries/product-lifecycle-management/"
        target="_blank"
        style="text-decoration: none; color: #0a95d5"
      >
        Resources
      </a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" style="text-decoration: none; color: #0a95d5">
          <span class="icon">
            <i class="fa fa-user-circle-o"></i>
          </span>
        </a>
        <!-- <div class="navbar-dropdown is-boxed">
            <a class="navbar-item" @click="" v-for="(user, index) in users">
              <div v-if="index === currentUser">
                <strong @click="currentUser = index">{{ user.name }}</strong>
              </div>
              <div v-else @click="currentUser = index">{{ user.name }}</div>
            </a>
          </div> -->
      </div>
    </div>
  </nav>
  <!-- Nav End -->
</template>
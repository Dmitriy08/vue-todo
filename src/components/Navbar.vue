<template>
  <header class="page_header ls ms" id="nav">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-4">
          <router-link
              active-class="active"
              to="/"
              exact
              class="nav__item">
            <a class="logo" href="#">LOGO</a>
          </router-link>
        </div>
        <div class="col-8">
          <nav class="top-nav">
            <ul class="nav">
              <router-link
                  tag="li"
                  active-class="active"
                  to="/"
                  exact
                  class="nav__item">
                <a href="#">Task List</a>
              </router-link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>

</script>
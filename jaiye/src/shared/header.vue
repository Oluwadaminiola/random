<template>
  <header role="banner" id="header-scroll" class="header">
    <div class="container">
      <nav class="navbar navbar-light bg-transparent navbar-fixed-top" role="navigation">
        <!-- site logo -->
        <a class="navbar-brand" href="#" role="link">
          <img :src="require('@/assets/img/logo-dark.svg')" alt="JaiyeLagos logo" class="logo-light">
          <img :src="require('@/assets/img/logo-dark.svg')" alt="JaiyeLagos logo" class="logo-dark">
        </a>
        <!-- background toggle -->
        <div class="mobile-wrap">
          <div id="nav-icon2">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <!-- Mobile Menu -->
          <div class="secondary-menu">
            <div class="secondary-menu-content">
              <ul id="secondary-ul" class="nm-menu">
                <li class="menu-item">
                  <a href="about.html/">About Jaiye</a>
                </li>
                <li class="menu-item">
                  <a href="#">Activities</a>
                </li>
                <li class="menu-item">
                  <a href="#">Experiences</a>
                </li>
                <li class="menu-item">
                  <a href="#">List A Business/Event</a>
                </li>
                <li class="menu-item">
                  <a href="#">Contact Us</a>
                </li>
                <li class="menu-item btn btn-white">
                  <a href="#">Log In</a>
                </li>
                <li class="menu-item btn btn-secondary">
                  <a href="#">Join Us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul class="nav header-menu justify-content-end" role="menubar">
          <li class="nav-item" role="menuitem">
            <a class="nav-link" href="#" aria-live="assertive" aria-label="how it works">About Jaiye</a>
          </li>
          <li class="nav-item" role="menuitem">
            <a class="nav-link" href="#" aria-live="assertive" aria-label="FAQs">Activities</a>
          </li>
          <li class="nav-item" role="menuitem">
            <a class="nav-link" href="#" aria-live="assertive" aria-label="About Us">experiences</a>
          </li>
          <li class="nav-item" role="menuitem">
            <a
              class="nav-link"
              href="#"
              aria-live="assertive"
              aria-label="About Us"
            >list a business/event</a>
          </li>
          <li class="nav-item" role="menuitem">
            <a class="nav-link" href="#" aria-live="assertive" aria-label="About Us">contact us</a>
          </li>
          <li class="nav-item" role="menuitem">
            <a
              class="nav-link btn btn-secondary btn-xs btn-light"
              href="#"
              role="button"
              aria-live="assertive"
              aria-label="sign in"
            >log in</a>
          </li>
          <li class="nav-item" role="menuitem">
            <a
              class="nav-link btn btn-primary btn-xs btn-orange"
              href="#"
              role="button"
              aria-live="assertive"
              aria-label="sign up"
            >join us</a>
          </li>
        </ul>
      </nav>
      <div class="mobile-nav hide">
        <ul>
          <li class="nav-item" role="menuitem">
            <a class="nav-link" href="#" aria-live="assertive" aria-label="how it works">About Jaiye</a>
          </li>
          <li class="nav-item" role="menuitem">
            <a class="nav-link" href="#" aria-live="assertive" aria-label="FAQs">Activities</a>
          </li>
          <li class="nav-item" role="menuitem">
            <a class="nav-link" href="#" aria-live="assertive" aria-label="About Us">experiences</a>
          </li>
          <li class="nav-item" role="menuitem">
            <a
              class="nav-link"
              href="#"
              aria-live="assertive"
              aria-label="About Us"
            >list a business/event</a>
          </li>
          <li class="nav-item" role="menuitem">
            <a class="nav-link" href="#" aria-live="assertive" aria-label="About Us">contact us</a>
          </li>
          <li class="nav-item" role="menuitem">
            <a
              class="nav-link btn btn-secondary btn-xs btn-light"
              href="#"
              role="button"
              aria-live="assertive"
              aria-label="sign in"
            >log in</a>
          </li>
          <li class="nav-item" role="menuitem">
            <a
              class="nav-link btn btn-primary btn-xs btn-orange"
              href="#"
              role="button"
              aria-live="assertive"
              aria-label="sign up"
            >join us</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
export default {};
</script>

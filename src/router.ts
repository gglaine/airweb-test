import { createRouter, createWebHistory } from 'vue-router';
import ProductCatalogue from './components/ProductCatalogue.vue';
import CheckoutPage from './components/CheckoutPage.vue';
import AboutPage from './components/pages/AboutPage.vue';
import ContactPage from './components/pages/ContactPage.vue';
import ServicesPage from './components/pages/ServicesPage.vue';

const routes = [
  { path: '/', component: ProductCatalogue },
  { path: '/checkout', component: CheckoutPage },
  { path: '/about', component: AboutPage },
  { path: '/contact', component: ContactPage },
  { path: '/services', component: ServicesPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

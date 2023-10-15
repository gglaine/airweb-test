<template>
    <div class="bg-white min-h-52 w-full p-6 pb-36 mt-24 navbar-animated">
        <!-- <img src="/BEARSHOP-BAG.svg" alt="Logo" class="h-16 w-32 mr-2 mb-4" /> -->
            <img src="AKTI-B.svg" alt="Logo" class="h-8 mr-2" />

        <!-- Footer Links -->
        <div class="flex justify-between mt-4 text-black font-bold">
            <!-- Information Links -->
            <div class="w-1/3">
                <ul>
                    <li class="mb-2"><a href="/about" class="hover:text-gray-300">About This</a></li>
                    <li class="mb-2"><a href="/contact" class="hover:text-gray-300">Contact</a></li>
                    <li><a href="/terms-of-service" class="hover:text-gray-300">Terms of Service</a></li>
                </ul>
            </div>

            <!-- Social Media Links -->
            <div class="w-1/3">
                <ul>
                    <li class="mb-2">
                        <a href="#" class="hover:text-gray-300">
                            <i class="fab fa-facebook"></i> Github
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="#" class="hover:text-gray-300">
                            <i class="fab fa-twitter"></i> Agency
                        </a>
                    </li>
                    <li>
                        <a href="#" class="hover:text-gray-300">
                            <i class="fab fa-instagram"></i> Instagram
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Copyright -->
        <div class="mt-8 text-white font-bold">
            <p>&copy; {{ new Date().getFullYear() }} AIRSHOP {{ t('English') }}.</p>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
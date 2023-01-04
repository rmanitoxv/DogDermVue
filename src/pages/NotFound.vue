<template>
    <div class="container mx-auto mt-20 mb-40">
        <div class="lg:-mx-6 lg:flex">          
            <!-- NOT FOUND -->
            <div class="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    <!-- HEADER -->
                    <span class="mt-20 text-8xl block xl:inline text-second barlow">404 Error</span>
                    <div class="flex">
                        <span class="my-3 block xl:inline">Page was not found</span>
                    </div>
                </h1>
                <p class="my-4 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                    It seems that this page cannot be found on our servers. Please go back!</p>

                <div class="mb-15 mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div class="mt-0 sm:mt-0 sm:ml-3">
                        <router-link to="/" class="font-medium py-3 px-5 rounded-3xl text-white hover:text-white button-color">
                            <span>Back to Home</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <!-- PICTURE -->
            <div class="mt-20 object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96">
                <img src="/images/404.svg" alt="">
            </div>            
        </div>
    </div>
</template>

<script>
export default {

}
</script>

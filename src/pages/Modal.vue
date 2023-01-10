<template>
  <!-- Modal -->
  <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto animate-fade-in-down"
    id="notifModal" tabindex="-1" aria-labelledby="notifModalLabel" aria-hidden="true">
    <div class="modal-dialog relative w-auto pointer-events-none">
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-3xl outline-none text-current">
        <div class="m-8">
          <p class="text-xl !mb-0 font-bold"> Confirm Changes? </p>
          <div class="modal-body relative !mt-0 mb-4 text-grey">
            Please type your password below to confirm changes.
          </div>
          <div class="flex items-center mr-16 mb-4">
            <label class="sm:w-full w-2/5 flex justify-end text-sm 2xs:text-base mr-2 sm:text-lg">
              Password:
            </label>
            <div class="justify-start login__box w-full !mt-0">
              <input :disabled="validated == 1" type="password" placeholder="Password" class="login__input"
                id="password">
            </div>
          </div>
          <div class="flex items-center mr-16">
            <label class="sm:w-full w-2/5 flex justify-end text-sm 2xs:text-base mr-2 sm:text-lg">
              Re-type Password:
            </label>
            <div class="justify-start login__box w-full !mt-0">
              <input :disabled="validated == 1" type="password" placeholder="Password" class="login__input"
                id="password">
            </div>
          </div>
          <div class="flex w-full justify-end">
            <button type="button"
              class="mr-[1.125rem] w-[7.5rem] text-first border-[.15rem] border-first py-[.35rem] rounded-3xl sm:mt-[2.5rem] mx-2 text-sm sm:text-lg" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="button" data-bs-dismiss="modal" class="w-[7.5rem] bg-first text-white p-2 rounded-3xl sm:mt-[2.5rem] mx-2 text-sm sm:text-lg">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export {

}
</script>

<script>
    export let closeModal;
</script>
<div class="modal">
    <div class="modal-content">
        <iframe width="500" height="330" src={`https://www.youtube.com/embed/Go8nTmfrQd8`} allow='autoplay' />
        <button on:click={closeModal}>Close</button>
    </div>
</div>
<style>
    .modal{
        position: absolute;
        inset: 0;
        /* height: 100%; */
        /* background-color: pink; */
        /* position: relative; */
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        isolation: isolate;
    }
    .modal::after{
        content: '';
        position: absolute;
        inset: 0;
        background-color: #171717;
        opacity: 0.5;
        z-index: -1;
    }
    .modal-content{
        /* background-color: red; */
        width: 600px;
        aspect-ratio: 16/9;
        border: 2px solid black;
        /* z-index: -1; */
    }
</style>
<template>
  <div class="row">
    <div class="col-md-12">
      <div class="d-flex row">
        <div class="p-2">
          <div class="d-flex row">
            <div class="p-2 mx-xs-1">
              <a href="blogs.html">
                <img @click="$goBack()" :src="require('@/assets/img/Group (2).png')">
              </a>
            </div>
            <div class="p-2 mx-xs-1">
              <button style="width: 9em;" class="btn btn-yellow">Preview</button>
            </div>
            <div class="p-2 mx-xs-1">
              <button style="width: 9em;" class="btn btn-yellow">Set Publish Date</button>
            </div>
            <div class="p-2 mx-xs-1">
              <button style="width: 9em;" class="btn btn-yellow">Ready to Post</button>
            </div>
          </div>
          <div class="d-flex row">
            <div class="p-2 mx-xs-1">
              <div class="well-r">
                <button class="btn btn-lblue">Nightlife</button>
              </div>
            </div>
            <div class="p-2 mx-xs-1">
              <button class="btn btn-blue" style="width: 7.8em;">Add Tag</button>
            </div>
            <div class="p-2 mx-xs-1">
              <button class="btn btn-purple">Nightlife</button>
            </div>
            <div class="p-2 mx-xs-1">
              <button class="btn btn-purple">Cuisine</button>
            </div>
          </div>
        </div>
        <div class="p-2 ml-lg-auto ml-xs-0 mx-xs-1">
          <p class="text-center">
            <button class="btn btn-red">x</button>
          </p>
          <p class="text-center" style="color: #3d3f99; font-family: gothic;">Cancel Post</p>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="input-group titform mt-5">
      <div class="input-group-prepend">
        <span class="input-group-text">Title</span>
      </div>
      <input class="form-control" type="text" placeholder="Enter your title...">
    </div>
    <div class="col-md-12">
      <p class="pt-5 st">Start Writing</p>
      <button class="btn btn-round">+</button>
    </div>
  </div>
</template>
<script>
export default {
    
}
</script>


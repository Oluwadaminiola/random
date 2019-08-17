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
    <p class="pt-5 st">Start Writing</p>

    <div
      class="input-group titform mt-5"
      v-for="(items,index) in post.blogpost"
      style="margin-top:5px !important;margin-bottom:1em !important; height:auto !important"
    >
      <div class="input-group-prepend">
        <!-- <span class="input-group-text">Title</span> -->
        <div
          style="display:flex !important;padding-top: 6px;
    padding-bottom: 6px;
    padding-right: 12px;z-index:400;position:absolute"
          v-if="index == focused && showFB(index)"
        >
          <div class="p-2">
            <button v-if="!showButtons" class="btn-round" @click="toggleButton()">+</button>
            <button v-else class="btn-round" @click="toggleButton()">x</button>
          </div>
          <!-- <div class="p-2" v-if="showButtons ">
          </div>-->
          <div class="p-2 animated fadeIn" v-if="showButtons">
            <button @click="openMedia('image',index)" title="add an image" class="btn-round">
              <img :src="require('@/assets/img/Group (4).png')">
            </button>
          </div>
          <!-- <div class="p-2 animated fadeIn" v-if="showButtons">
          <button title="search a word" class="btn-round">
            <img :src="require('@/assets/img/Group (3).png')">
          </button>
          </div>-->
          <div class="p-2 animated fadeIn" v-if="showButtons ">
            <button @click="showEmbed(index)" title="add an embed" class="btn-round">
              <img :src="require('@/assets/img/Group (5).png')">
            </button>
          </div>
          <div title="add an image" class="p-2 animated fadeIn" v-if="showButtons">
            <button @click="openMedia('video',index)" class="btn-round">
              <img :src="require('@/assets/img/Fill 125.png')">
            </button>
          </div>
        </div>
      </div>
      <!-- <input class="form-control" type="text" placeholder="Enter your title..."> -->
      <div
        @keypress="newLine(index)"
        @keydown="clear(this,index)"
        contenteditable="true"
        @focus="focused = index"
        id="text"
        class="my-style"
        style="display:inline !important"
      ></div>
      <el-tooltip class="item" effect="dark" content="Top Right prompts info" placement="top">
        <div slot="content">
          <i class="fas fa-trash" style="cursor:pointer" @click="removeMediaAtIndex(index)"></i>
        </div>

        <div
          style="display:block !important"
          class="my-style-inherited"
          v-show="post.blogpost[index].image"
        >
          <img
            :id="'image'+index"
            style="    
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;"
          >
          <!-- <button
          style="position: absolute;
    bottom: 140p;
    left: 440px;
    top: 180px;"
          class="btn-round"
        >
          <i class="fas fa-times"></i>
          </button>-->
        </div>

        <div align="center" class="embed" v-show="post.blogpost[index].image">
          <input
            v-show="post.blogpost[index].image"
            placeholder="Type a caption for the image(optional)"
            v-model="post.blogpost[index].caption"
            class="embed"
            style="width:400px !important;!important;text-align:center"
          >
        </div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="Top Right prompts info" placement="left">
        <div slot="content">
          <i class="fas fa-trash" style="cursor:pointer" @click="removeMediaAtIndex(index)"></i>
        </div>
        <div
          style="display:block !important;display: block !important;
    height: 120px !important;
    box-shadow: 0px 0px 2px #38409b;
    padding:unset;width:90%"
          class="my-style-inherited row"
          v-if="post.blogpost[index].metadata"
        >
          <div class="col-md-8" style="display:inline-block">
            <strong>
              <span
                class="title"
              >{{post.blogpost[index].url.replace("http://","").replace("https://","")}}</span>
            </strong>
            <span
              class="description"
            >{{post.blogpost[index].metadata.description || "No description available"}}</span>
            <span class="url">{{post.blogpost[index].url}}</span>
          </div>
          <!-- <div style="display:inline;padding:unset" class="col-md-4">
          <img :src="post.blogpost[index].metadata['msapplication-TileImage']">
          </div>-->
        </div>
      </el-tooltip>
      <input
        @keypress="embed(index)"
        :id="index"
        placeholder="Paste a link to embed content from another site (e.g https://twitter) and press Enter "
        v-if="showEmbbed && focused == index"
        v-model="post.blogpost[index].url"
        type="url"
        class="embed"
      >
    </div>
    <div class="col-md-12">
      <!-- <p class="pt-5 st"></p> -->
      <!-- <br -->
      <input
        hidden
        @change="setBackground"
        type="file"
        id="image"
        accept="image/png, image/jpg, image/jpeg"
      >
      <!-- <input hidden type="file" id="video" accept="video/mp4" @change="setVideo"> -->
    </div>
  </div>
</template>
<script>
const Scraper = require("lite-meta-scraper");
export default {
  data() {
    return {
      showButtons: false,
      showEmbbed: false,
      focused: 0,
      post: {
        embed: [],
        blogpost: [{ url: "", image: "", caption: "", video: "" }]
      },
      url: "",
      current: ""
    };
  },
  mounted() {
    init();
    this.embbed();
  },
  methods: {
    showFB(index) {
      return !(
        this.post.blogpost[index].url || this.post.blogpost[index].image
      );
    },
    getStyle(index) {
      return {
        "background-image":
          "url(" +
          this.post.blogpost[index].metadata["msapplication-TileImage"] +
          ")"
      };
    },
    removeMediaAtIndex(index) {
      this.post.blogpost[index].image = "";
      this.post.blogpost[index].video = "";
    },
    toggleButton() {
      this.showButtons = !this.showButtons;
    },
    showEmbed(index) {
      this.showButtons = false;
      this.showEmbbed = true;
      document.getElementById(index).focus();
      // this.focus();
    },
    embed(index) {
      if (event.code == "Enter") {
        let self = this;
        new Scraper({
          url: "https://cors-anywhere.herokuapp.com/" + event.target.value
        }).scrape((err, data) => {
          console.log(data);
          self.post.blogpost[index].metadata = data;
          self.$forceUpdate();
        });
        this.showEmbbed = false;
        return;
        this.$darangiMetaScrapper(event.target.value, data => {
          console.log(data);
        });
      }
    },
    newLine(index) {
      if (event.code == "Enter") {
        if (!event.target.innerHTML.replace(/\s/g, "")) {
          return;
        }
        var keyEvent = new KeyboardEvent("keypress", {
          backSpaceKey: true
        });
        event.target.dispatchEvent(keyEvent);
        this.post.blogpost[index].post = event.target.innerHTML;
        // document.getElementsByClassName("my-style")[index].height = "auto"
        this.post.blogpost.push({});
        setTimeout(() => {
          document.getElementsByClassName("my-style")[index + 1].focus();
        }, 50);
        return;
      }
    },
    clear(e, index) {
      if (index == 0) {
        this.post.blogpost[index].post = undefined;
      }
      if (
        event.code == "Backspace" &&
        event.target.className == "my-style" &&
        index > 0 &&
        !event.target.innerHTML
      ) {
        this.post.blogpost.splice(index, 1);
        //mad man
        document.getElementsByClassName("my-style")[index - 1].focus();
      }
    },

    openMedia(type, index) {
      $(`#${type}`).click();
      this.current = index;
    },
    setBackground(file) {
      if (!file.target.files[0]) {
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = e => {
        this.post.blogpost[this.current].image = file.target.files[0];
        this.setImage(e.target.result);
        $(`#image`).attr("value", "");
      };
    },
    setVideo(file) {
      if (!file.target.files[0]) {
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = e => {
        this.post.blogpost[this.current].video = file.target.files[0];
        this.setVide(e.target.result);
        $(`#video`).attr("value", "");
      };
    },
    setImage(image) {
      // debugger;
      $(`#image${this.current}`).attr("src", image);
      this.toggleButton();
    },
    setVide(src) {
      // debugger;
      $(`#video${this.current}`).attr("src", src);
      this.toggleButton();
    }
  }
};
var observe;
if (window.attachEvent) {
  observe = function(element, event, handler) {
    element.attachEvent("on" + event, handler);
  };
} else {
  observe = function(element, event, handler) {
    element.addEventListener(event, handler, false);
  };
}
function init() {
  return;
  var text = document.getElementById("text");
  function resize() {
    text.style.height = "auto";
    text.style.height = text.scrollHeight + "px";
  }
  /* 0-timeout to get the already changed text */
  function delayedResize() {
    window.setTimeout(resize, 0);
  }
  observe(text, "change", resize);
  observe(text, "cut", delayedResize);
  observe(text, "paste", delayedResize);
  observe(text, "drop", delayedResize);
  observe(text, "keydown", delayedResize);

  text.focus();
  text.select();
  resize();
}
</script>
<style scoped>
.my-style {
  border: 0 none white;
  overflow: hidden;
  height: auto;
  margin-left: 50px;
  outline: none;
  width: 100%;
  padding: 10px !important;
  font-size: 14px;
}
.my-style-inherited {
  border: 0 none white;
  overflow: hidden;
  height: 300px;
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 60px;
  outline: none;
  width: 100%;
  padding: 10px !important;
  font-size: 14px;
}
.my-style:focus {
  border: 0 none white;
  overflow: hidden;
  /* padding: 0; */
  padding: 10px !important;
  outline: none;
}
.my-style-inherited img:hover {
  border: 3px solid #3d3f99;
}
.my-style-inherited img:focus {
  border: 3px solid #3d3f99;
}
.embed {
  border: unset;
  /* border-bottom: 1px solid #ccc; */
  border-radius: unset;
  outline: none;
  font-size: 14px !important;
  margin-left: 60px;
  width: 100% !important;
}
.embed::placeholder {
  font-size: 14px !important;
}
.remove-color {
  color: white !important;
  border-color: white !important;
}
.embed:focus {
  border: unset;
  /* border-bottom: 1px solid #ccc; */
  border-radius: unset;

  /* outline: none;
   */
}
textarea:focus {
  outline: 1px solid #fff !important;
}
.title {
  letter-spacing: 0;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  line-height: 1.3;
  color: rgba(0, 0, 0, 0.9);
  display: block;
  margin-bottom: 10px;
}
.description {
  font-size: 14px;
  font-style: normal;
  color: rgba(0, 0, 0, 0.68);
  display: block;
  margin-top: -1px;
  margin-bottom: 10px;
  overflow: hidden;
}
.url {
}
</style>


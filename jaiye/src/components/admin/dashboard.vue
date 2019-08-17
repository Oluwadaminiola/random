<template>
  <div class="row">
    <div class="col-md-9">
      <search :refresh="range.from" @refresh="refresh()" @daterange="daterange"></search>
    </div>
    <div class="col-md-3"></div>
    <div class="col-md-4">
      <div class="homecard">
        <div class="d-flex row">
          <div style="display:inline-block !important" class="py-lg-2 pl-2 px-lg-5 px-xs-2">
            <img :src="require('@/assets/img/Rectangle.png')">
          </div>
          <div style="display:inline-block !important" class="p-2">
            <p>Number of Users</p>
            <i style="color:#3d3f99" v-if="isLoading" class="fa fa fa-spin fa-spinner"></i>
            
            <b v-else>{{dashboardData.users}}</b>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="homecard">
        <div class="d-flex row">
          <div class="py-lg-2 pl-2 px-lg-5 px-xs-2">
            <img :src="require('@/assets/img/Rectangle.png')">
          </div>
          <div class="p-2">
            <p>Number of Events</p>
            <i style="color:#3d3f99" v-if="isLoading" class="fa fa fa-spin fa-spinner"></i>
            
            <b v-else>{{dashboardData.events}}</b>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="homecard">
        <div class="d-flex row">
          <div class="py-lg-2 pl-2 px-lg-5 px-xs-2">
            <img :src="require('@/assets/img/Rectangle.png')">
          </div>
          <div class="p-2">
            <p>Number of Ads</p>
            <i style="color:#3d3f99" v-if="isLoading" class="fa fa fa-spin fa-spinner"></i>
            
            <b v-else>{{dashboardData.ads}}</b>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <div class="homecard">
        <div class="d-flex row mb-4">
          <div class="p-2">
            <b>Flight Bookings</b>
          </div>
          <div class="p-2 ml-lg-auto ml-xs-0">
            <select class="form-control ml-auto" style="width: 9em; ">
              <option>2016</option>
              <option>2017</option>
              <option>2018</option>
            </select>
          </div>
        </div>
        <div id="container" style="min-width: 10em; height: 300px; margin: 0 auto"></div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="row">
        <div class="col-md-12">
          <div class="homecard">
            <div class="d-flex row">
              <div class="py-lg-2 pl-2 px-lg-5 px-xs-2">
                <img :src="require('@/assets/img/Rectangle.png')">
              </div>
              <div class="p-2">
                <p>Number of listings</p>
                <i style="color:#3d3f99" v-if="isLoading" class="fa fa fa-spin fa-spinner"></i>
                <b v-else>{{dashboardData.listings}}</b>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="homecard">
            <div class="d-flex row">
              <div class="py-lg-2 pl-2 px-lg-5 px-xs-2">
                <img :src="require('@/assets/img/Rectangle.png')">
              </div>
              <div class="p-2">
                <p>Number of Posts</p>
                <i style="color:#3d3f99" v-if="isLoading" class="fa fa fa-spin fa-spinner"></i>
                
                <b v-else>{{dashboardData.posts}}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from "@/api/dashboard";
import Search from "@/shared/my-search-header";
let highChart = Highcharts;

export default {
  data() {
    return {
      dashboardData: [],
      range: { to: "", from: "" },
      isLoading: false
    };
  },
  components: {
    Search
  },
  created() {
    require("@/assets/css/page4.css");
    this.LoadDashboardData();
    require("@/assets/css/bootstrap.css");
  },
  mounted(){
    this.charts();

  },
  methods: {
    daterange(date) {
      this.range.to = date.to;
      this.range.from = date.from;
      this.LoadDashboardData();
    },
    refresh() {
      this.range = { to: "", from: "" };
      this.LoadDashboardData();
    },
    LoadDashboardData() {
      this.isLoading = true;
      Api.dashboardData(this.range).then(res => {
        this.dashboardData = res.data;
        this.isLoading = false;
      });
    },
    charts() {
      highChart.chart("container", {
        chart: {
          type: "column"
        },
        title: {
          text: ""
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        xAxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: ""
          }
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} flights</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.4,
            borderWidth: 0,
            borderRadius: 4
          }
        },
        series: [
          {
            name: "Flight Bookings",
            data: [
              49.9,
              71.5,
              106.4,
              129.2,
              144.0,
              176.0,
              135.6,
              148.5,
              216.4,
              194.1,
              95.6,
              54.4
            ]
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
/* .homecard p,.homecard b{
    font-size: 15px !important
}
.homecard{
    margin:5px !important;
}
.px5-lg-5,.py-lg-2{
    padding: unset !important;
} */
</style>


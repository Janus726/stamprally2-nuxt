import Vue from 'vue'
import $ from 'jquery'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'

const KEY = 'AIzaSyCFGCDw-FmdDqvZh5doRoCeEuNqxaKdZ-s'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCFGCDw-FmdDqvZh5doRoCeEuNqxaKdZ-s',
    // map_ids: '63195e970b363d97',
    libraries: 'places'
  }
})

export default {
  async sanpToRoad (points) {
    const pointValues = []
    const resValues = []
    for (let i = 0; i < points.length; i++) {
      pointValues.push(points[i].lat + ',' + points[i].lng)
    }
    await $.get('https://roads.googleapis.com/v1/snapToRoads', {
      interpolate: true,
      key: KEY,
      path: pointValues.join('|')
    }).then(function (data) {
      for (let n = 0; n < data.snappedPoints.length; n++) {
        resValues.push({
          lat: data.snappedPoints[n].location.latitude,
          lng: data.snappedPoints[n].location.longitude
        })
      }
      console.log(resValues)
    })
    return resValues
  }
}

import _ from 'lodash'
import {asNonCompoundGraph, buildLayerMatrix} from '../util'
import {positionX} from './bk'

function positionY (g) {
  var layering = buildLayerMatrix(g)
  var rankSep = g.graph().ranksep
  var prevY = 0
  _.forEach(layering, function (layer) {
    var maxHeight = _.max(_.map(layer, function (v) { return g.node(v).height }))
    _.forEach(layer, function (v) {
      g.node(v).y = prevY + maxHeight / 2
    })
    prevY += maxHeight + rankSep
  })
}

export default function position (g) {
  g = asNonCompoundGraph(g)

  positionY(g)
  _.forEach(positionX(g), function (x, v) {
    g.node(v).x = x
  })
}

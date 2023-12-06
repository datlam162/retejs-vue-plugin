import Vue from 'vue'

import { type Props } from './../index'

export function create(element: any, component: any, payload: any, onRendered: any, props?: Props) {
  const options = props?.setupVue2 ? props.setupVue2() : {}

  const app = new Vue({
    props: ['payload'],
    render(h) {
      return h(component, { props: { ...this.payload, seed: Math.random() }, ref: 'child' })
    },
    mounted() {
      onRendered()
    },
    updated() {
      onRendered()
    },
    ...options
  })

  app.payload = payload

  const container = document.createElement('div')

  if (container) {
    element.appendChild(container)
  }

  app.$mount(container || element)

  return app
}

export function update(app: any, payload: any) {
  app.payload = { ...app.payload, ...payload }

  app.$refs.child.$forceUpdate()
}

export function destroy(app: any) {
  app.$destroy()
  app.$el.remove()
}

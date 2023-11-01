import { describe, expect, it } from 'vitest'
import { mount } from '../../src'

const innerHTML = '<input><span>Hello world</span>'
const outerHTML = `<div id="attach-to">${innerHTML}</div>`
const template = '<div id="attach-to"><input /><span>Hello world</span></div>'
const TestComponent = { template }

describe('options.wrapWith', () => {
    it('wraps with custom element', () => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.id = 'root'
        document.body.appendChild(svg)
        expect(document.getElementById('root')).not.toBeNull()
        expect(document.getElementById('attach-to')).toBeNull()
        const wrapper = mount(TestComponent, {
            attachTo: svg,
            wrapWith: "aCustomHtmlElement"
        })
        const root = document.getElementById('root')
        const rendered = document.getElementById('attach-to')!
        //console.log(svg.innerHTML)
        expect(rendered.parentElement!.nodeName).toBe('ACUSTOMHTMLELEMENT')
        expect(root).not.toBeNull()
        expect(rendered).not.toBeNull()
        expect(rendered.outerHTML).toBe(outerHTML)
        wrapper.unmount()
        expect(document.getElementById('attach-to')).toBeNull()
    })

    it('does not wrap with custom element if attachTo is null', () => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.id = 'root'
        document.body.appendChild(svg)
        expect(document.getElementById('root')).not.toBeNull()
        expect(document.getElementById('attach-to')).toBeNull()
        const wrapper = mount(TestComponent, {
            attachTo: svg
        })
        const root = document.getElementById('root')
        const rendered = document.getElementById('attach-to')!
        expect(rendered.parentElement!.nodeName).not.toBe('ACUSTOMHTMLELEMENT')
        expect(root).not.toBeNull()
        expect(rendered).not.toBeNull()
        expect(rendered.outerHTML).toBe(outerHTML)
        wrapper.unmount()
        expect(document.getElementById('attach-to')).toBeNull()
    })
})
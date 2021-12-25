// import { expect } from 'chai'
const {expect} = require('chai') 
// import rules from './index'
const rules = require('./index')

const httpRule = rules['no-duplicate-http-in-urls']
const reports = []
const fakeContext = {
    report: ({ location, message }) => {
        console.log(`Error Report`)
        reports.push({location, message})
    }
}

describe('', () => {
    const fakeFlowConfig = {}
    it('should report not report error if no nodes', () => {
        // Arrange
        const nodes = []
        const createdFunction = httpRule.create(fakeContext, fakeFlowConfig)
        // Act 
        createdFunction.start(fakeFlowConfig)
        nodes.forEach(node => createdFunction["type:http in"](node))
        createdFunction.end(fakeFlowConfig)
        // Assert
        expect(reports.length).to.equal(0)
    })
    it('should report warning if two duplicate nodes', () => {
        // Arrange
        const nodeWithUrl = {
            config: {
                method: "GET",
                url: "http://nodered.org"
            }
        }
        const nodes = [{id:1, ...nodeWithUrl},{id:2, ...nodeWithUrl}]
        const createdFunction = httpRule.create(fakeContext, fakeFlowConfig)
        // Act 
        createdFunction.start(fakeFlowConfig)
        nodes.forEach(node => createdFunction["type:http in"](node))
        createdFunction.end(fakeFlowConfig)
        // Assert
        expect(reports.length).to.equal(1)
    })
})
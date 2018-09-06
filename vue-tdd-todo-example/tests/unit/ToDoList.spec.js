import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import ToDoList from '@/components/ToDoList.vue'

describe('ToDoList.vue', () => {
  it('should have name', async () => {
    const wrapper = shallowMount(ToDoList)

    expect(wrapper.name()).to.equal('ToDoList')
  })
  it('should initial return empty array', async () => {
    const wrapper = shallowMount(ToDoList, {
      propsData: {
        arrTask: [],
      },
    })

    expect(wrapper.props().arrTask).to.eql([])
  })
})

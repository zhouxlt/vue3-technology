<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="count++">ref count is: {{ count }}</button>
    <!-- 模板语法需要使用data.属性来调用 -->
    <button @click="data.count2++">reactive count is: {{ data.count2 }}</button>
    <button @click="test1++">reactive torefs count is: {{ test1 }}</button>
    <button @click="test2++">reactive torefs count is: {{ test2 }}</button>
    <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
    <button @click="clickMe()">点我弹窗</button>

    <p><input type="text" v-model="age"></p>
    <p><input type="text" v-model="nextAge"></p>

    <div ref="root">hahahaha</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, h, ref, reactive, toRefs, toRef, computed, watch, provide, inject,
    onBeforeMount,// 在组件挂载之前执行的函数
    onMounted,
    onBeforeUpdate,// 在组件修改之前执行的函数
    onUpdated,
    onBeforeUnmount,// 在组件卸载之前执行的函数
    onUnmounted,
    readonly, 
  } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  // 使用setup 代替 data和method
  // 因为我这里使用的是typescript，因此需要给参数指定类型
  setup (props: any, context: any) {
    // setup 函数中的 props 是响应式的，当传入新的 prop 时，它将被更新
    // const { msg } = props; // props 是响应式的，你不能使用 ES6 解构，因为它会消除 prop 的响应性
    // const { msg } = toRefs(props) // 如果需要解构 prop，可以通过使用 setup 函数中的 toRefs 来完成此操作
    // console.log(context.attrs) // Attribute (非响应式对象)
    // console.log(context.slots) // 插槽 (非响应式对象)
    // console.log(context.emit) // 触发事件 (方法): 这个可以用作将子组件的值传递给父组件

    // 可以使用ref函数，用于创建一个响应式数据，当数据发生改变时，Vue会自动更新UI
    let count = ref<number>(0)
    // reactive 创建响应式对象;在我看来，reactive函数 就是VUE3.0为我们提供的替代VUE2.0中data的一个函数，因此，在这里，我不建议将方法也写到reactive函数中
    let data = reactive({
      // 定义响应式数据
      count2: 1,
    });
    const clickMe = () => {
      // 使用ref关键字绑定的变量，赋值 的时候必须使用.value
      count.value++;
      // 调用reactive 定义对象的参数的时候需要使用对象.来调用
      data.count2++;
      data2.test1++;

      alert('hi');
    }

    /**
     * **模板语法中需要使用data.属性**来调用属性显示，相对来说就比较麻烦。
     * 其实我们可以使用ES6中的扩展运算符来对其进行解构处理，但是，这样吧解构之后，便不再具有响应式的属性，这个不行。
     * VUE3.0为我们提供了toRefs函数可以解决这个问题
     */
    let data2 = reactive({test1: 2, test2: 3})
    let data2jiegou = toRefs(data2)

    /**
     * computed
     */
    const age = ref(18)
    const nextAge = computed(() => {
      return age.value - 0 + 1 // +age.value + 1 , 去除字符串拼接
    });

    /**
     * watch
     */
    watch(
      () => data2.test2,
      (newValue, oldValue) => {
        console.log('改变了');
        console.log('我是新的值',newValue);
        console.log('我是旧的值',oldValue);
      }
    );

    /**
     * 生命周期函数
     */
    onMounted(() => {
      console.log('Component is mounted!')
      console.log(root.value);
    })

    /**
     * provide和inject写写
     */
    provide('location', 'North Pole')
    provide('geolocation', {
      longitude: 90,
      latitude: 135
    })
    // 为了增加 provide 值和 inject 值之间的响应性，我们可以在 provide 值时使用 ref 或 reactive, 这两个 property 中有任何更改，子组件也将自动更新
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })
    provide('location', location) // 确保通过 provide 传递的数据不会被 inject 的组件更改
    // provide('geolocation', readonly(geolocation))
    // 有时我们需要在注入数据的组件内部更新 inject 的数据
    const updateLocation = () => {
      location.value = 'South Pole'
    }
    provide('updateLocation', updateLocation)
    // 子组件的setup中可以使用inject获取到父父父父组件的provide的数据
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')
    /**
     * 返回渲染组件
     */
    // return () => h('div', [count.value, data.count2])

    /**
     * ref引用Dom模板
     */
    let root = ref(null)
    

    return {
      count,
      data,
      ...data2jiegou,
      clickMe,
      age,
      nextAge,
      root, // setup函数中return出去的才能被生命周期函数等使用
      
    }
  }
  // 这是VUE2.0的写法，data与methods
  /*data() {
    return {
      count: 0
    }
  },
  methods:{
    clickMe(){
      alert('hi');
    }
  }//*/
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

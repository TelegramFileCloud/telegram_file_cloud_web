<template>
  <v-container>
    <input class="input" ref="input" multiple="multiple" type="file" name="file" id="file" @change="inputChange" />

    <template>
      <div>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left"> 名称 </th>
                <th class="text-center"> 最后更新 </th>
                <th class="text-center"> 尺寸 </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in fileData" :key="item.id">
                <td>
                  <v-icon v-if="item.isDirectory">{{ icon.mdiFolder }}</v-icon>
                  <v-icon v-else>{{ icon.mdiFile }}</v-icon>
                  {{ item.name }}
                </td>
                <td class="text-center">{{ item.updateTime }}</td>
                <td class="text-center">{{ item.size || '-' }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>

      <v-speed-dial v-model="fab" bottom right fixed>
        <template v-slot:activator>
          <v-btn v-model="fab" fab color="primary" @click="$refs.input.click()">
            <v-icon v-if="fab">{{ icon.mdiCloudUpload }}</v-icon>
            <v-icon v-else>{{ icon.mdiPlus }}</v-icon>
          </v-btn>
        </template>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn fab small color="primary" v-on="on">
              <v-icon>{{ icon.mdiFolderPlus }}</v-icon>
            </v-btn>
          </template>
          <span>新建目录</span>
        </v-tooltip>
      </v-speed-dial>
    </template>
  </v-container>
</template>

<script>
  import vuetify from '@/utils/mixins/vuetify'

  export default {
    name: 'Home',
    mixins: [vuetify],
    data: () => ({
      fileData: [],
      fab: true,
      // url: 'https://localhost:5001',
      url: 'https://pan.wuyu.one'
    }),
    computed: {
      items() {
        return Array.from({ length: this.length }, (k, v) => v + 1)
      },
      length() {
        return 7000
      }
    },
    methods: {
      inputChange(event) {
        let files = event.target.files
        console.log(files)
        let fd = new FormData()
        files.forEach((file) => {
          fd.append(file.name, file)
        })

        fetch(`${this.url}/file/upload/1`, {
          method: 'POST',
          body: fd,
        })
          .then((res) => {
            if (res.ok) {
              console.log('success')
              return res.json()
            } else {
              console.log('error')
            }
          })
          .then((res) => {
            console.log('res is', res)
          })
      }
    },
    mounted() {
      let url = new URL(`${this.url}/file/list`)
      url.searchParams.append('path', '\\')
      fetch(url.toString()).then(async (res) => {
        if (res.ok) {
          let data = await res.json()
          this.fileData = data.response
          console.log(data)
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  .input {
    visibility: hidden;
  }
</style>

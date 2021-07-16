<template>
  <v-container>
    <input class="input" ref="input" multiple="multiple" type="file" name="file" id="file" @change="inputChange" />
    <template>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">名称</th>
              <th class="text-center" style="width: 120px">最后更新</th>
              <th class="text-center" style="width: 120px">尺寸</th>
              <th class="text-center" style="width: 100px">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in fileData" :key="item.id">
              <td @click="clickFile(item)" class="click">
                <v-icon v-if="item.isDirectory">{{ icon.mdiFolder }}</v-icon>
                <v-icon v-else>{{ icon.mdiFile }}</v-icon>
                {{ item.name }}
              </td>
              <td class="text-center">{{ item.updateTime }}</td>
              <td class="text-center">{{ item.size || '-' }}</td>
              <td class="text-center">
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click="copyLink(item)">
                      <v-icon>{{ icon.mdiContentCopy }}</v-icon>
                    </v-btn>
                  </template>
                  <span>复制链接</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <div v-show="no_data" class="text-center pt-4">
        <v-img contain height="240" src="@/assets/img/no-data.png" content-class="loading-img">
          <v-progress-circular
            v-show="loading"
            class="loading-progress-circular"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-img>
      </div>

      <v-speed-dial open-on-hover v-model="fab" bottom right fixed>
        <template v-slot:activator>
          <v-btn v-model="fab" fab color="primary" @click="$refs.input.click()">
            <v-icon v-if="fab">{{ icon.mdiCloudUpload }}</v-icon>
            <v-icon v-else>{{ icon.mdiPlus }}</v-icon>
          </v-btn>
        </template>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn fab small color="primary" v-on="on" @click="showCreat = true">
              <v-icon>{{ icon.mdiFolderPlus }}</v-icon>
            </v-btn>
          </template>
          <span>新建目录</span>
        </v-tooltip>
      </v-speed-dial>

      <v-dialog v-model="showCreat" max-width="380">
        <v-card>
          <v-card-title class="headline primary white--text" primary-title> 新建目录 </v-card-title>
          <v-card-text>
            <v-text-field label="目录名称" hide-details v-model="directoryName"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue" text @click="showCreat = false">关闭</v-btn>
            <v-btn color="primary" dark @click="creatDirectory">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-container>
</template>

<script>
  import vuetify from '@/utils/mixins/vuetify'

  export default {
    name: 'Home',
    mixins: [vuetify],
    data: () => ({
      fileData: null,
      fab: false,
      showCreat: false,
      loading: true,
      directoryName: '',
      // url: 'https://localhost:5001',
      url: 'https://pan.wuyu.one',
      dirID: null
    }),
    computed: {
      path() {
        return this.$route.query.path || ''
      },
      no_data() {
        return this.fileData === null || this.fileData.length === 0
      }
    },
    watch: {
      '$route.query.path'() {
        this.requestList()
      }
    },
    methods: {
      inputChange(event) {
        if (this.dirID == null) return

        let files = event.target.files
        console.log(files)
        let fd = new FormData()
        files.forEach((file) => {
          fd.append(file.name, file)
        })

        fetch(`${this.url}/file/upload/${this.dirID}`, {
          method: 'POST',
          body: fd
        }).then((res) => {
          if (res.ok) {
            this.$message('上传成功')
            this.requestList()
          } else {
            this.$message('上传失败', 3000, 'error')
          }
        })
      },
      requestList() {
        this.loading = true
        this.fileData = null
        this.dirID = null

        let url = new URL(`${this.url}/file/list`)
        if (this.path !== '') url.searchParams.append('path', this.path)
        fetch(url.toString()).then(async (res) => {
          if (res.ok) {
            let data = await res.json()
            this.fileData = data.response?.list
            this.dirID = data.response?.id
          }
          this.loading = false
        })
      },
      copyLink(row) {
        navigator.clipboard.writeText(`${this.url}/get${this.path}/${row.name}`).then(() => {
          this.$message('成功')
        })
      },
      clickFile(row) {
        if (row.isDirectory) {
          this.$router.push({
            path: 'home',
            query: {
              path: `${this.path}/${row.name}`
            }
          })
        }
      },
      creatDirectory() {
        fetch(`${this.url}/file/CreatDirectory`, {
          method: 'POST',
          body: JSON.stringify({
            path: `${this.path}/${this.directoryName}`
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          if (res.ok) {
            this.$message('创建成功')
            this.requestList()
          }
          this.showCreat = false
        })
      }
    },
    mounted() {
      this.requestList()
    }
  }
</script>

<style scoped lang="scss">
  .input {
    visibility: hidden;
  }
  .click {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ::v-deep {
    .loading-img {
      background-color: hsla(0, 0%, 100%, 0.9);
      top: 20px;
      transition: opacity 0.3s;
    }

    .loading-progress-circular {
      position: absolute;
      top: 120px;
    }
    table {
      table-layout: fixed;
    }
  }
</style>

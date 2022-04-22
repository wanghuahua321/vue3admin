<template>

  <a-form v-if="!isEdit" class="createForm" ref="roleForm" :model="createRoleform" :rules="rules">
    <a-form-item v-if="types=='编辑'" class="formItems" label="租户名称" ref="names" name="name">
      <a-input v-model:value="createRoleform.name" placeholder="请输入租户名称" />
    </a-form-item>
    <div v-else-if="types=='管理链接字符串'">
      <!-- defaultConnectionString -->
      <a-form-item class="formItems" label="使用共享数据库">
        <a-checkbox v-model:checked="useSharedDatabase"></a-checkbox>
      </a-form-item>
      <a-form-item label="默认连接字符串" v-if="!useSharedDatabase" name="defaultConnectionString">
        <a-input v-model:value="createRoleform.defaultConnectionString" />
      </a-form-item>
    </div>

    <a-form-item v-else-if="types=='管理功能'" class="formItems" v-for="feature in features" :key="feature.name" :label="feature.displayName">
      <a-checkbox v-if="feature.valueType.name === 'ToggleStringValueType'" v-model:value="temp[feature.name]" />
      <a-input v-else-if="
                        feature.valueType.name === 'FreeTextStringValueType'
                    " v-model:value="temp[feature.name]" />
      <a-select default-value="" style="width: 100%" v-model:value="temp[feature.name]" v-else-if="
                        feature.valueType.name === 'SelectionStringValueType' &&
                            feature.valueType.itemSource
                    ">
        <a-select-option v-for="item in feature.valueType.itemSource.items" :key="item.name" :value="item.value">
          <span>{{item.displayText.name}}</span>
        </a-select-option>
      </a-select>
    </a-form-item>

  </a-form>

  <a-form v-else class="createForm" ref="roleForm" :model="createRoleform" :rules="rules">
    <a-form-item class="formItems" label="租户名称" name="name">
      <a-input v-model:value="createRoleform.name" placeholder="请输入租户名称" />
    </a-form-item>
    <a-form-item class="formItems" label="管理员电子邮件地址" name="adminEmailAddress">
      <a-input v-model:value="createRoleform.adminEmailAddress" placeholder="请输入管理员电子邮件地址" />
    </a-form-item>
    <a-form-item class="formItems" label="管理员密码" name="adminPassword">
      <a-input v-model:value="createRoleform.adminPassword" placeholder="请输入管理员密码" />
    </a-form-item>
    <a-form-item class="formItems" label="手机号" name="phoneNumber">
      <a-input v-model:value="createRoleform.phoneNumber" placeholder="请输入手机号" />
    </a-form-item>

  </a-form>

</template>
<script lang='ts'>
import { reactive, onMounted, toRefs, ref } from "vue";
import { certification } from "@/utils/api";
import { useStore } from "vuex";
import { tuple } from "ant-design-vue/lib/_util/type";

export default {
  name: "createForm",
  components: {},
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    types: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const roleForm = ref();
    const store = useStore();
    const phoneNumberValidator = (rule: any, value: any, callback: any) => {
      console.log("value", value);
      if (!value) {
        return new Promise((resolve, reject) => {
          reject("字段手机号不可为空.");
        });
      }
      const reg = /^[1][3,5,7,8][0-9]{9}$/;
      if (!reg.test(value)) {
        return new Promise((resolve, reject) => {
          reject("手机号格式不对");
        });
      }
      return Promise.resolve();
    };

    const passwordValidator = (rule: any, value: any, callback: any) => {
      if (!value) {
        return new Promise((resolve, reject) => {
          reject("字段管理员密码不可为空.");
        });
      }
      if (value.length < 6) {
        return new Promise((resolve, reject) => {
          reject("密码至少为6个字符.");
        });
      }
      return Promise.resolve();
    };
    const pagedata = reactive({
      formDatas: {},
      createRoleform: {},
      rules: {
        name: {
          required: true,
          message: "字段租户名称不可为空.",
        },
        adminEmailAddress: [
          {
            required: true,
            message: "字段管理员电子邮件地址不可为空.",
            trigger: "blur",
          },
          {
            type: "email",
            message: "字段邮箱地址不是有效的邮箱地址",
            trigger: ["blur", "change"],
          },
          {
            max: 256,
            message: "字段邮箱地址不是有效的邮箱地址",
            trigger: "blur",
          },
        ],
        adminPassword: {
          required: true,
          validator: passwordValidator,
          trigger: ["blur", "change"],
        },
        phoneNumber: {
          required: true,
          validator: phoneNumberValidator,
          trigger: ["blur", "change"],
        },
        defaultConnectionString: {
          required: false,
          message: "字段租户名称不可为空.",
        },
      },
      featuresQuery: {
        providerKey: "",
        providerName: "T",
      },
      features: [],
      temp: {},
      useSharedDatabase: true, // 使用共享数据库
    });
    if (props.isEdit) {
      //新增
      pagedata.createRoleform = {
        adminEmailAddress: "",
        adminPassword: "",
        name: "",
        phoneNumber: "",
      };
    } else {
      pagedata.createRoleform = { ...store.state.editClick };
      console.log("0000000", pagedata.createRoleform);
    }

    onMounted(() => {
      getFeaturess();
      getConnection();
    });

    const getFeaturess = () => {
      //管理功能
      certification.tenant
        .getFeatures(pagedata.featuresQuery)
        .then((res) => {
          pagedata.features = res.groups[0].features;
          console.log("00000", pagedata.features);

          pagedata.features.map((feature: any) => {
            if (feature.valueType.name === "ToggleStringValueType") {
              pagedata.temp[feature.name] = feature.value === "true";
            } else if (
              feature.valueType.name === "FreeTextStringValueType" ||
              feature.valueType.name === "SelectionStringValueType"
            ) {
              pagedata.temp[feature.name] = feature.value;
            }
          });
        })
        .catch((error) => {});
    };
    const updataFeature = () => {
      certification.tenant
        .updataFeatures("", pagedata.featuresQuery)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {});
    };

    const getConnection = () => {
      //获取连接数据
      certification.tenant
        .getConnection((pagedata.createRoleform as any).id)
        .then((res) => {
          if (res) {
            pagedata.useSharedDatabase = false;
            (pagedata.temp as any).defaultConnectionString = res;
          } else {
            pagedata.useSharedDatabase = true;
          }
          console.log(res);
        })
        .catch((error) => {});
    };

    return {
      ...toRefs(pagedata),
      roleForm,
      getFeaturess,
      updataFeature,
      getConnection,
    };
  },
};
</script>

<style scoped lang="scss">
.createForm {
  width: 100%;
  min-height: 180px;
  .formItems {
    // flex-direction: column !important;
    // // justify-content: space-around;
    // align-items: flex-start;
  }
}
</style>

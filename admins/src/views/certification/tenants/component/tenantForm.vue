<template>

  <a-form v-if="!isEdit" class="createForm" ref="roleForm" :model="createRoleform" :rules="rules">
    <a-form-item v-if="types=='编辑'" class="formItems" label="租户名称" ref="names" name="name">
      <a-input v-model:value="createRoleform.name" placeholder="请输入租户名称" />
    </a-form-item>
    <div v-else-if="types=='管理链接字符串'">
      <a-form-item class="formItems" label="租户名称" ref="names" name="name">
        <a-checkbox v-model="useSharedDatabase">11</a-checkbox>
      </a-form-item>
      <a-form-item class="formItems" label="租户名称" ref="names" name="name">
        <a-checkbox v-model="useSharedDatabase">11</a-checkbox>
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
    <a-form-item class="formItems" label="租户名称" ref="names" name="name">
      <a-input v-model:value="createRoleform.name" placeholder="请输入租户名称" />
    </a-form-item>
    <a-form-item class="formItems" label="管理员电子邮件地址" ref="names" name="name">
      <a-input v-model:value="createRoleform.adminEmailAddress" placeholder="请输入管理员电子邮件地址" />
    </a-form-item>
    <a-form-item class="formItems" label="管理员密码" ref="names" name="name">
      <a-input v-model:value="createRoleform.adminPassword" placeholder="请输入管理员密码" />
    </a-form-item>
    <a-form-item class="formItems" label="手机号" ref="names" name="name">
      <a-input v-model:value="createRoleform.phoneNumber" placeholder="请输入手机号" />
    </a-form-item>

  </a-form>

</template>
<script lang='ts'>
import { reactive, onMounted, toRefs, ref } from "vue";
import { certification } from "@/utils/api";
import { useStore } from "vuex";

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
    const pagedata = reactive({
      formDatas: {},
      createRoleform: {},
      rules: {
        name: {
          required: true,
          message: "Please input name",
        },
        adminEmailAddress: {
          required: true,
          message: "Please input name",
        },
        adminPassword: {
          required: true,
          message: "Please input name",
        },
        phoneNumber: {
          required: true,
          message: "Please input name",
        },
      },
      featuresQuery: {
        providerKey: "",
        providerName: "T",
      },
      features: [],
      temp: {},
    });
    if (props.isEdit) {
      pagedata.createRoleform = { ...store.state.editClick };
      console.log("0000000", pagedata.createRoleform);
    } else {
      pagedata.createRoleform = {
        adminEmailAddress: "",
        adminPassword: "",
        name: "",
        phoneNumber: "",
      };
    }

    onMounted(() => {
      getFeaturess();
    });

    const getFeaturess = () => {
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

    return {
      ...toRefs(pagedata),
      roleForm,
      getFeaturess,
      updataFeature,
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

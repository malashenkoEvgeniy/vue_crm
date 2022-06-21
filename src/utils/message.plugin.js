export default {
  install: (app1, options) => {
    app1.config.globalProperties.$message = function (html) {
      window.M.toast({ html: html })
    }

    app1.config.globalProperties.$error = function (html) {
      window.M.toast({ html: `[Error]: ${html}` })
    }
  }
}

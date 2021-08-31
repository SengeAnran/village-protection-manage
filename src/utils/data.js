import { Message } from "element-ui";
// 数组头部添加“全部”选项
export function addAllOption(arr) {
  if (Array.isArray(arr)) {
    return [{ label: "全部", value: "全部" }].concat([...arr]);
  }
  return arr;
}

/**
 * @desc 文件导出
 * @param {Blob} blobData 文件数据
 * @param {String} fileName 文件名称
 */

export function downloadFile(blobData, fileName) {
  let blob = new Blob([blobData.data], { type: "application/vnd.ms-excel" });
  const reader = new FileReader();
  reader.onload = function() {
    try {
      // json能解析: 后台返回的原始数据，说明出错
      const resData = JSON.parse(this.result);
      Message({
        type: "error",
        message: resData.msg
      });
    } catch {
      const href = URL.createObjectURL(blob);
      _downloadLink(href, fileName);
    }
  };

  reader.readAsText(blob);
}

function _downloadLink(url, fileName) {
  const aDom = document.createElement("a");
  aDom.style.display = "none";
  aDom.href = url;
  aDom.setAttribute("download", fileName);
  document.body.appendChild(aDom);
  aDom.click();
  document.body.removeChild(aDom);

  Message({
    type: "success",
    message: "成功导出文件！"
  });
}

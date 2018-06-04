<template> 
<!-- 富文本编译器 -->
<div> 
	<div v-show="!content">{{content}}</div>
	<div id="editorElem" style="text-align:left"></div>
	<!-- <div id="editor" style="width:950px;height:400px;">ddddddddddddddddd</div> -->
</div>
</template>

<script type="text/javascript">
import http from "../../axios/http.js";  
import ApiSetting from '../../axios/ApiSetting.js';
import E from 'wangeditor'
export default {
	props: ['content'],
  data () {
    return {
    	bosToken: '', // 图片上传
    	bosToken1: '', // 图片上传
    	url: '',
    	editorContent: ''
    }
  },
   mounted() {
   	this.start()
      },
  methods: {
  	start(index){
  		// if (index) {
  		// 	editor.txt.html(this.content)
  		// }else{
  			var that = this;
    http(ApiSetting.getSessionKey,{ type:1 })
    .then((res) => {
      	that.bosToken=res.data.data.sessionToken;
      	that.bosToken1 = res.data.data.bosObj;
      	var editor = new E('#editorElem')
        editor.customConfig.menus = [
                'head',
                'bold',
                'italic',
                'underline',
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'list',  // 列表
                'justify',  // 对齐方式
                'emoticon',  // 表情
                'image',  // 插入图片
                'undo',  // 撤销
                'video'  // 插入视频
            ]
        editor.customConfig.onchange = (html) => {
          that.$emit('fileUps',html)
        }
        editor.customConfig.uploadImgServer = '/index'; // 上传图片到服务器
        editor.customConfig.customUploadImg = function (files, insert) {
        /**
		 * 初始化上传方法
		 */
		var sessionToken = {}, uploadId;
		var generateLocalKey = function(file, chunkSize, bucket) {
			return [ file.name, file.size, chunkSize, bucket, file.key ].join('&');
		};
		var getUploadId = function(key) {
			return localStorage.getItem(key);
		};
		var setUploadId = function(key, uploadId) {
			return localStorage.setItem(key, uploadId);
		};
		var removeUploadId = function(key) {
			return localStorage.removeItem(key);
		};
		function uploadPartFile(state, bosClient) {
			return function(task, callback) {
				if (task.etag) {
					// 如果有etag字段，则直接跳过上传
					callback(null, {
						http_headers : {
							etag : task.etag
						},
						body : {}
					});
				} else {
					// 否则进行上传
					var blob = task.file.slice(task.start, task.stop + 1);
					bosClient.uploadPartFromBlob(task.bucketName, task.key,
							task.uploadId, task.partNumber, task.partSize, blob).then(
							function(res) {
								++state.loaded;
								callback(null, res);
							})
				}
			};
		}

		function getEtag(partNumber, parts) {
			// 从已上传part列表中找出特定partNumber的part的eTag
			for (var i = 0, l = parts.length; i < l; i++) {
				if (parts[i].partNumber === partNumber) {
					return parts[i].eTag;
				}
			}
			return null;
		}
		function getTasks(file, uploadId, bucket, key, parts, PART_SIZE) {
			var leftSize = file.size;
			var offset = 0;
			var partNumber = 1;

			var tasks = [];

			while (leftSize > 0) {
				var partSize = Math.min(leftSize, PART_SIZE);
				var task = {

					file : file,
					uploadId : uploadId,
					bucketName : bucket,
					key : key,
					partNumber : partNumber,
					partSize : partSize,
					start : offset,
					stop : offset + partSize - 1
				};

				// 如果在已上传完成的分块列表中找到这个分块的etag，那么记录下来
				var etag = getEtag(partNumber, parts);
				if (etag) {
					task.etag = etag;
				}
				tasks.push(task);
				leftSize -= partSize;
				offset += partSize;
				partNumber += 1;
			}
			return tasks;
		}

		var initUploadPart = function(file, bucket, key, options, client, PART_SIZE) {
			// 根据文件生成localStorage的key
			var localKey = generateLocalKey(file, PART_SIZE, bucket);
			// 获取对应的`uploadId`
			var uploadId = getUploadId(localKey);
			if (uploadId) {
				// `uploadId`存在，说明有未完成的分块上传。
				// 那么调用`listParts()`获取已上传分块信息。
				return client.listParts(bucket, key, uploadId, options).then(
						function(response) {
							// response.body.parts里包含了已上传分块的信息
							// response.body.uploadId = uploadId;
							return response;
						});
			} else {
				// `uploadId`不存在，那么用正常的流程初始化
				return client.initiateMultipartUpload(bucket, key, options).then(
						function(response) {
							// response.body.uploadId为新生成的`uploadId`
							response.body.parts = [];
							// 为了下次能使用断点续传，我们需要把新生成的`uploadId`保存下来
							setUploadId(localKey, response.body.uploadId);
							return response;
						});
			}
		}
		var getBosClient = function(sessionToken) {
			var bosConfig = {
				credentials : {
					ak : sessionToken.ak,
					// STS服务器下发的临时ak
					sk : sessionToken.sk
				// STS服务器下发的临时sk
				},
				sessionToken : sessionToken.token,
				// STS服务器下发的sessionToken
				endpoint : 'http://bj.bcebos.com'
			};
			var client = new baidubce.sdk.BosClient(bosConfig);
			return client;
		}

		var appendUUIDNameForPaht = function(fileBean, useFor) {
			var filePath = fileBean.filePath;
			var filetype = filePath.substring(filePath.lastIndexOf("."),
					filePath.length);
			var fileName = filePath.substring(filePath.lastIndexOf("/"), filePath
					.lastIndexOf("."));
			var newPath = filePath.substring(0, filePath.lastIndexOf("/")) + fileName
					+ "-" + UUID(6) + filetype;
			fileBean.filePath = newPath;
			if (verifyFile(fileBean, useFor) > 0) {
				appendUUIDNameForPaht(fileBean, useFor);
			} else {
				return newPath;
			}
		}

		/**
		 * 获得百度API接口options
		 */
		var getOptions = function(file) {
			var ext = file.key.split(/\./g).pop();
			var mimeType = baidubce.sdk.MimeType.guess(ext);
			if (/^text\//.test(mimeType)) {
				mimeType += '; charset=UTF-8';
			}
			var options = {
				'Content-Type' : mimeType
			};
			return options;
		}
        	/**
                 * 图片上传
                 */
                var start = function(sessionToken, file, bucket, path) {
                    // 获得上传client对象
                    var client = getBosClient(sessionToken);
                    var timestamp=new Date().getTime();
                    var filename=file.name;
                    var uploadPath = path+timestamp+filename.substring(filename.lastIndexOf("."),filename.length);

                    // 定义分开大小
                    var PART_SIZE;
                    if (file.size > 1024 * 1024 * 15) {
                        PART_SIZE = 5 * 1024 * 1024; // 指定分块大小
                    } else {
                        PART_SIZE = file.size;
                    }

                    // options
                    file.key = uploadPath;
                    var options = getOptions(file);
                    var localKey = generateLocalKey(file, PART_SIZE, bucket);
                    var hasUpload;
                    initUploadPart(file, bucket, uploadPath, options, client, PART_SIZE).then(
                        function(response) {
                            uploadId = response.body.uploadId; // 开始上传，获取服务器生成的uploadId
                            file.uploadId = uploadId;
                            var parts = response.body.parts || []; // 已上传的分块列表。如果是新上传，则为空数组
                            hasUpload = parts.length * PART_SIZE;
                            var deferred = baidubce.sdk.Q.defer();
                            var tasks = getTasks(file, uploadId, bucket, uploadPath, parts,
                                PART_SIZE);
                            var state = {
                                lengthComputable : true,
                                loaded : parts.length,
                                total : tasks.length
                            };
                            client.emit('progress', state);
                            // 为了管理分块上传，使用了async（https://github.com/caolan/async）库来进行异步处理
                            var THREADS = 1; // 同时上传的分块数量
                            async.mapLimit(tasks, THREADS, uploadPartFile(state, client,
                                options), function(err, results) {
                                if (err) {
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(results);
                                }
                            });
                            return deferred.promise;
                        }).then(
                        function(allResponse) {
                            var partList = [];
                            allResponse.forEach(function(response, index) {
                                // 生成分块清单
                                partList.push({
                                    partNumber : index + 1,
                                    eTag : response.http_headers.etag
                                });
                            });
                            return client.completeMultipartUpload(bucket, uploadPath,
                                uploadId, partList); // 完成上传
                        }).then(function(res) {
                        // 上传成功-移除之前的缓存
                        removeUploadId(localKey);
                        // 写成功逻辑
                        console.log("success");
                    });
                    var aee=0;
                    client
                        .on(
                            'progress',
                            function(evt) {
                                // 监听上传进度
                                if (evt.lengthComputable) {

                                    var percentage = 0;
                                    if (evt.loaded == evt.total) {
                                        hasUpload += evt.loaded;
                                        percentage = (parseInt(hasUpload) / file.size) * 100;
                                    } else {
                                        percentage = ((parseInt(evt.loaded) + parseInt(hasUpload)) / file.size) * 100;
                                    }
                                    file.uploadStatus = 1;
                                    file.upProgress = percentage;
                                    if (percentage >= 100) {
                                        file.percentProgress = "100%";
                                    } else {
                                        file.percentProgress = percentage.toFixed(2)
                                            + "%";
                                    }
                                    console.log("上传进度：" + file.percentProgress);
                                    console.log(uploadPath)
                                    if (file.percentProgress=='100%'){
                                        ++aee;
                                        if (aee==1){
                                            setTimeout(function () {
                                                insert('http://project-cdn.bj.bcebos.com/'+uploadPath)
                                            }, 1000);
                                        }

                                    }

                                }
                            });

                    client.on('error', function(evt) {
                        // 上传失败
                        console.log("上传失败");
                    });
                    return  uploadPath
                };
                start(that.bosToken,files[0],that.bosToken1.bucket,that.bosToken1.basePath);
                // start(bosToken,files[0],'project-cdn','agentServices/top_img/');
        }
        editor.create()
        if (this.content) {
            editor.txt.html(this.content)
        }else{
            editor.txt.html('')
        }
        
    }, (error) => {  
      console.log(error)
    })
  		// }
  	}
  },
  watch: {  
    content(newValue, oldValue) {  
    	this.start(1)
    }  
}  
}
</script>

<style lang="less" scoped>

</style>

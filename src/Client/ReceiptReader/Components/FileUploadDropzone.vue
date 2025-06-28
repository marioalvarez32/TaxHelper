<template>
	<div class="file-uploader">
		<div class="file-uploader-dropzone">
			<v-icon icon="mdi-upload" size="50"></v-icon>
			<div class="file-uploader-dropzone__description">
				<p><span>Arrastra y suelta archivos</span></p>
				<p>o</p>
				<v-btn variant="elevated" color="primary" size="small" @click="openDirectoyDialog"
					>Selecciona archivos</v-btn
				>
			</div>
			<p class="file-uploader-dropzone__supported-files-label">Archivos soportados: XML</p>
		</div>
		<div class="file-uploader-dropzone__list-container">
			<div class="file-uploader-dropzone__header-container">
				<p>Archivos cargados</p>
			</div>
			<div class="file-uploader-dropzone__list">
				<div class="file-uploader-dropzone__list-item" v-for="(file, index) in fileListMock" :key="index">
					<div class="file-uploader-dropzone__information-container">
						<v-icon icon="mdi-file-account" size="large" color="blue-darken-2" />
						<p class="file-uploader-dropzone__file-name">{{ file.name }}</p>
					</div>
					<v-icon icon="mdi-delete" size="small" color="red" />
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import { ref, watch, type PropType } from 'vue';
	import { ipcRenderer } from 'electron';
	import FileService from '../Services/FileService';
	import path from 'path';

	const fileService = new FileService();

	const fileListMock = [
		{
			name: 'Factura_123.xml',
			size: '1.2 MB',
			type: '',
		},
		{
			name: 'Factura_456.xml',
			size: '800 KB',
			type: '',
		},
		{
			name: 'Factura_789.xml',
			size: '2.5 MB',
			type: '',
		},
		{
			name: 'Factura_1011.xml',
			size: '1.8 MB',
			type: '',
		},
		{
			name: 'Factura_1011.xml',
			size: '1.8 MB',
			type: '',
		},
		{
			name: 'Factura_1011.xml',
			size: '1.8 MB',
			type: '',
		},
		{
			name: 'Factura_1011.xml',
			size: '1.8 MB',
			type: '',
		},
		{
			name: 'Factura_1011.xml',
			size: '1.8 MB',
			type: '',
		},
	];
	const selectedFileDirectory = ref('');
	const shouldTriggerFileRead = ref(false);
	const isLoading = ref(false);

	watch(
		() => shouldTriggerFileRead.value,
		() => {
			if (shouldTriggerFileRead.value) {
				loadFiles();
				shouldTriggerFileRead.value = false;
			}
		},
	);

	async function loadFiles() {
		// Read the directoy and get list of files.
		// Once the files are read, load each one and add it to the fileListMock.
		const filesInDirectory = ref<string[]>([]);
		await fileService
			.readXmlDirectory(selectedFileDirectory.value, 'xml')
			.then((files) => {
				filesInDirectory.value = files;
			})
			.finally(() => (isLoading.value = false));

		//readFilesInDirectory(filesInDirectory.value);
		const firstFile = filesInDirectory.value[0];
		const xmlFilePath = path.join(selectedFileDirectory.value, firstFile);
		console.log('🚀 ~ loadFiles ~ xmlFilePath:', xmlFilePath);

		fileService.validateCfdi(xmlFilePath);
		console.log('🚀 ~ loadFiles ~ filesInDirectory:', filesInDirectory);
	}

	function openDirectoyDialog() {
		ipcRenderer
			.invoke('showSelectDirectoryDialog', 'Hello from the renderer!')
			.then((result) => {
				if (result.canceled) return;
				selectedFileDirectory.value = result.filePaths[0];
				shouldTriggerFileRead.value = true;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function readFilesInDirectory(filesInDirectory: string[]) {
		isLoading.value = true;
		fileService
			.readXmlFiles(selectedFileDirectory.value, filesInDirectory)
			.then((result) => {
				console.log('🚀 ~ loadFile ~ result:', result);
			})
			.finally(() => (isLoading.value = false));
	}
</script>

<style lang="scss" scoped>
	.file-uploader {
		display: grid;
		grid-template-columns: 230px 2fr;
		align-items: center;
		height: 100%;
		padding: 25px;
		gap: 10px;
	}

	.file-uploader-dropzone {
		height: 100%;
		width: 100%;
		//border: 2px dashed rgb(var(--v-theme-primary));
		border-width: 4px;
		border-style: dashed;
		border-radius: 20px; /* For rounded corners */
		border-color: rgba(var(--v-theme-primary), 0.2);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 5px;
	}

	.file-uploader-dropzone__supported-files-label {
		font-size: 12px;
	}

	.file-uploader-dropzone__description {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.file-uploader-dropzone__list-container {
		height: 100%;
		width: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.file-uploader-dropzone__list-container p {
		font-weight: bold;
	}

	.file-uploader-dropzone__list {
		height: 100%;
		width: 100%;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding-top: 10px;
	}

	.file-uploader-dropzone__list-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: 5px;
	}

	.file-uploader-dropzone__information-container {
		display: flex;
		align-items: center;
	}

	.file-uploader-dropzone__file-name {
		font-weight: bold;
		font-size: 12px;
	}
</style>

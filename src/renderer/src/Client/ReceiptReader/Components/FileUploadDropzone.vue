<template>
	<div class="file-uploader">
		<div class="file-uploader-dropzone">
			<v-icon icon="mdi-upload" size="50"></v-icon>
			<div class="file-uploader-dropzone__description">
				<p><span>Arrastra y suelta archivos</span></p>
				<p>o</p>
				<v-btn variant="elevated" color="primary" size="small" @click="openDirectoyDialog">Selecciona archivos</v-btn>
			</div>
			<p class="file-uploader-dropzone__supported-files-label">Archivos soportados: XML</p>
		</div>
		<div class="file-uploader-dropzone__list-container">
			<div class="file-uploader-dropzone__header-container">
				<p>Archivos cargados</p>
			</div>
			<div class="file-uploader-dropzone__list">
				<div class="file-uploader-dropzone__list-item" v-for="(file, index) in readFileList" :key="`${file.filePath}-${index}`">
					<div class="file-uploader-dropzone__information-container">
						<v-icon icon="mdi-file-account" size="large" color="blue-darken-2" />
						<p class="file-uploader-dropzone__file-name">{{ file.filePath }}</p>
					</div>
					<v-icon-btn hide-overlay :icon="getIconByStatus(file.status)" :loading="file.status === 'loading'" :icon-color="getIconColorByStatus(file.status)"></v-icon-btn>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import { ref, watch } from 'vue';
	import type { FileReadingStatus } from '../Models/FileReadingStatus';
	import { VIconBtn } from 'vuetify/labs/VIconBtn';

	const selectedFileDirectory = ref('');
	const shouldTriggerFileRead = ref(false);
	const readFileList = ref<FileReadingStatus[]>([]); // This needs to be of the typed CFDI. Must be a generic type extended by other sub types.
	const isLoading = ref(false);

	watch([shouldTriggerFileRead, selectedFileDirectory], () => {
		if (shouldTriggerFileRead.value) {
			loadFilesToReadList();
			shouldTriggerFileRead.value = false;
		}
	});

	async function loadFilesToReadList() {
		const filesInDirectory = ref<string[]>([]);
		await window.api.files
			.readXmlDirectory(selectedFileDirectory.value)
			.then((files) => {
				filesInDirectory.value = files;
			})
			.finally(() => (isLoading.value = false));
		// Ignore files that re already in the files to read.
		const newFilesToRead = filesInDirectory.value.filter((filePath) => !readFileList.value.some((file) => file.filePath === filePath));
		newFilesToRead.forEach((filePath) => {
			readFileList.value.push({ fileDirectory: selectedFileDirectory.value, filePath, status: 'pending' });
		});
		const pendingFilesToRead = readFileList.value.filter((file) => file.status === 'pending');
		parseAndValidateFiles(pendingFilesToRead);
	}

	function openDirectoyDialog() {
		window.api.files
			.showSelectDirectoryDialog()
			.then((result) => {
				if (result.canceled) return;
				selectedFileDirectory.value = result.filePaths[0];
				shouldTriggerFileRead.value = true;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function parseAndValidateFiles(filesToLoad: FileReadingStatus[]) {
		filesToLoad.forEach((fileToRead) => {
			loadFile(fileToRead);
		});
	}

	async function loadFile(file: FileReadingStatus) {
		// TODO: Implement worker threads to avoid blocking the UI
		updateFileToReadStatus(file.filePath, 'loading');
		const absoluteFilePath = await window.api.path.join(file.fileDirectory, file.filePath);
		const result = await window.api.files
			.parseAndvalidateCfdi(absoluteFilePath)
			.then((result) => {
				console.log('🚀 ~ loadFile ~ result:', result);
				return result;
			})
			.catch((err) => {
				updateFileToReadStatus(file.filePath, 'error', err.message);
			});

		// Loaded the file correctly. Now we need to parse it into a CFDI object.
		updateFileToReadStatus(file.filePath, 'success');
	}

	function updateFileToReadStatus(filePath: string, status: 'loading' | 'success' | 'error', message?: string) {
		const fileToRead = readFileList.value.find((file) => file.filePath === filePath);
		if (fileToRead) {
			fileToRead.status = status;
		}
	}

	function getIconByStatus(status: 'loading' | 'success' | 'error' | 'pending') {
		switch (status) {
			case 'loading':
				return 'mdi-loading';
			case 'success':
				return 'mdi-check';
			case 'error':
				return 'mdi-alert-circle-outline';
			case 'pending':
				return 'mdi-timer-sand';
		}
	}

	function getIconColorByStatus(status: 'loading' | 'success' | 'error' | 'pending') {
		switch (status) {
			case 'loading':
				return 'info';
			case 'success':
				return 'success';
			case 'error':
				return 'error';
			case 'pending':
				return 'warning';
		}
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

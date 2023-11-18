document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
document.getElementById('processButton').addEventListener('click', processFile, false);

let fileData = '';
let processedData = '';

function handleFileSelect(event) {
    const reader = new FileReader();
    reader.onload = function(fileEvent) {
        fileData = fileEvent.target.result;
    };
    reader.readAsText(event.target.files[0]);
}

function processFile() {
    if (!fileData) {
        alert('ファイルを選択してください！');
        return;
    }

    const lines = fileData.split('\n');
    processedData = '';
    const progressBar = document.getElementById('progressBar');
    progressBar.style.display = 'block';
    progressBar.max = lines.length;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('0') || lines[i].startsWith('-')) {
            let parts = lines[i].split(' ');
            if (parts.length > 3) {
                parts[0] = '0'; // X軸を0に設定
                // Y軸は変更しない
                parts[2] = '0'; // Z軸を0に設定
                processedData += parts.join(' ') + '\n';
            } else {
                processedData += lines[i] + '\n';
            }
        } else {
            processedData += lines[i] + '\n';
        }
        progressBar.value = i + 1;
    }

    const blob = new Blob([processedData], { type: 'text/plain' });
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'processed.bvh';
    downloadLink.style.display = 'block';
    downloadLink.textContent = '修正されたファイルをダウンロード';
}

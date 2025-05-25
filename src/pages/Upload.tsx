import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Typography, Paper } from "../components";
import { Upload as UploadIcon, X, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import clsx from "classnames";

const Upload = () => {
  const [bank, setBank] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{
    status: "idle" | "uploading" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  });

  const handleRemoveFile = () => {
    // Create a new FileList-like object without the files
    Object.assign(acceptedFiles, { length: 0 });
  };

  const handleUpload = async () => {
    if (!bank || !acceptedFiles || acceptedFiles.length === 0) return;

    setUploadStatus({ status: "uploading" });

    try {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      const response = await fetch(`http://localhost:3001/upload?bank=${bank}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      setUploadStatus({
        status: "success",
        message: "Soubor byl úspěšně nahrán",
      });
    } catch (error) {
      setUploadStatus({
        status: "error",
        message: "Chyba při nahrávání souboru",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gray-100 rounded-lg">
            <UploadIcon className="w-5 h-5 text-gray-900" />
          </div>
          <Typography variant="h2" className="text-gray-900">
            Nahrát výpis
          </Typography>
        </div>
        <Typography variant="small" className="text-gray-500">
          Nahrajte výpis z účtu pro zpracování transakcí
        </Typography>
      </div>

      {/* Bank Selection */}
      <Paper className="p-6">
        <Typography variant="h3" className="mb-4">
          Vyberte banku
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {["airbank", "kb", "csob", "fio"].map((bankName) => (
            <button
              key={bankName}
              onClick={() => setBank(bankName)}
              className={clsx(
                "p-4 rounded-lg border-2 transition-all duration-200",
                "flex items-center justify-center",
                bank === bankName
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              <span className="capitalize">{bankName}</span>
            </button>
          ))}
        </div>
      </Paper>

      {/* Upload Area */}
      {bank && (
        <Paper className="p-6">
          <Typography variant="h3" className="mb-4">
            Nahrát soubor
          </Typography>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={clsx(
              "border-2 border-dashed rounded-lg p-8",
              "transition-colors duration-200 cursor-pointer",
              "flex flex-col items-center justify-center text-center",
              isDragActive
                ? "border-primary-500 bg-primary-50"
                : "border-gray-300 hover:border-gray-400"
            )}
          >
            <input {...getInputProps()} />
            <UploadIcon
              className={clsx(
                "w-12 h-12 mb-4",
                isDragActive ? "text-primary-500" : "text-gray-400"
              )}
            />
            <Typography variant="body" className="mb-2">
              {isDragActive
                ? "Pusťte soubor pro nahrání"
                : "Přetáhněte soubor sem nebo klikněte pro výběr"}
            </Typography>
            <Typography variant="small" className="text-gray-500">
              Podporované formáty: CSV
            </Typography>
          </div>

          {/* File List */}
          {acceptedFiles && acceptedFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              <Typography variant="h3" className="text-sm font-medium text-gray-700">
                Vybraný soubor
              </Typography>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {acceptedFiles[0].name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(acceptedFiles[0].size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* File Rejections */}
          {fileRejections && fileRejections.length > 0 && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <AlertCircle className="w-5 h-5" />
                <Typography variant="body" className="font-medium">
                  Nepodporovaný soubor
                </Typography>
              </div>
              <ul className="text-sm text-red-700 list-disc list-inside">
                {fileRejections.map(({ file, errors }) => (
                  <li key={file.name}>
                    {file.name} - {errors[0].message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Upload Status */}
          {uploadStatus.status !== "idle" && (
            <div
              className={clsx(
                "mt-4 p-4 rounded-lg border flex items-center gap-2",
                {
                  "bg-blue-50 border-blue-100 text-blue-800":
                    uploadStatus.status === "uploading",
                  "bg-green-50 border-green-100 text-green-800":
                    uploadStatus.status === "success",
                  "bg-red-50 border-red-100 text-red-800":
                    uploadStatus.status === "error",
                }
              )}
            >
              {uploadStatus.status === "uploading" && (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent" />
              )}
              {uploadStatus.status === "success" && (
                <CheckCircle2 className="w-5 h-5" />
              )}
              {uploadStatus.status === "error" && (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">{uploadStatus.message}</span>
            </div>
          )}

          {/* Upload Button */}
          <div className="mt-6">
            <Button
              onClick={handleUpload}
              disabled={!acceptedFiles || acceptedFiles.length === 0 || uploadStatus.status === "uploading"}
              className="w-full sm:w-auto"
            >
              {uploadStatus.status === "uploading" ? (
                "Nahrávání..."
              ) : (
                <>
                  <UploadIcon className="w-4 h-4 mr-2" />
                  Nahrát soubor
                </>
              )}
            </Button>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default Upload;
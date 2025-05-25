import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Typography, Paper, Select } from "../components";
import {
  Upload as UploadIcon,
  X,
  FileText,
  AlertCircle,
  CheckCircle2,
  Wallet,
} from "lucide-react";
import clsx from "classnames";
import { useTab } from "../hooks/useTab";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../navigation/ROUTES";

const Upload = () => {
  const { client, tab } = useTab();
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<{
    status: "idle" | "uploading" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  });

  // Redirect to account creation if no accounts exist
  if (client && client.accounts.length === 0) {
    navigate(ROUTES.CLIENT.ACCOUNT_CREATE.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`));
    return null;
  }

  const selectedAccountDetails = client?.accounts.find(acc => acc.id === selectedAccount);

  const handleRemoveFile = () => {
    // Clear the accepted files
  };

  const handleUpload = async () => {
    if (!selectedAccount || !acceptedFiles.length) {
      toast.error("Vyberte účet a soubor pro nahrání");
      return;
    }

    setUploadStatus({ status: "uploading" });

    try {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/api/upload?accountId=${selectedAccount}&clientId=${tab.id}&bank=${selectedAccountDetails?.bankName.toLowerCase()}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const result = await response.json();

      setUploadStatus({
        status: "success",
        message: `Soubor byl úspěšně nahrán. Zpracováno ${result.transactionCount} transakcí.`,
      });

      // Clear the file
      handleRemoveFile();

      // Show success toast
      toast.success("Výpis byl úspěšně nahrán");

      // Redirect to transactions
      setTimeout(() => {
        navigate(
          ROUTES.CLIENT.TRANSACTIONS.replace(ROUTES.CLIENT_ROOT, `/${tab.id}/`)
        );
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Chyba při nahrávání souboru",
      });
      toast.error("Nepodařilo se nahrát výpis");
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

      {/* Account Selection */}
      {client && (
        <Paper className="p-6">
          <Typography variant="h3" className="mb-4">
            Vyberte účet
          </Typography>
          <Select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
          >
            <option value="">Vyberte účet</option>
            {client.accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} ({account.bankName})
              </option>
            ))}
          </Select>
        </Paper>
      )}

      {/* Selected Bank Info */}
      {selectedAccountDetails && (
        <Paper className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <Wallet className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <Typography variant="h3" className="mb-1">
                {selectedAccountDetails.bankName}
              </Typography>
              <Typography variant="small" className="text-gray-500">
                Nahrávání výpisu pro {selectedAccountDetails.name}
              </Typography>
            </div>
          </div>
        </Paper>
      )}

      {/* Upload Area */}
      {selectedAccount && (
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
              <Typography
                variant="h3"
                className="text-sm font-medium text-gray-700"
              >
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
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
              <span className="text-sm font-medium">
                {uploadStatus.message}
              </span>
            </div>
          )}

          {/* Upload Button */}
          <div className="mt-6">
            <Button
              onClick={handleUpload}
              disabled={
                !acceptedFiles ||
                acceptedFiles.length === 0 ||
                uploadStatus.status === "uploading"
              }
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
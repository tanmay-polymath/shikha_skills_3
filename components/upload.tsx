"use client"
import { cn } from "@/lib/utils"
import { FileText, Upload } from "lucide-react"
import { useState } from "react"

export default function UploadComponent() {
  const [file, setFile] = useState<File>()
  const [hide, setHide] = useState(false)
  const [dragging, setDragging] = useState(false)

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
    const file = event.dataTransfer.files[0]
    setFile(file)
  }

  const handleDataChange = (event: any) => {
    const selectedFile = event.target.files[0]
    const maxFileSize = 50 * 1024 * 1024

    if (selectedFile && selectedFile.size > maxFileSize) {
      event.target.value = null
    } else {
      setFile(selectedFile)
    }
  }
  return (
    <div className="mt-4">
      <label htmlFor="data" className="cursor-pointer">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          {...(!hide && { onDrop: handleDrop })}
          className={cn(
            dragging
              ? "disabled cursor-not-allowed border-2 border-zinc-400 bg-zinc-300 p-4 "
              : " cursor-pointer",
            "flex items-center justify-center rounded-lg border border-dashed border-zinc-900/50 p-6 hover:bg-zinc-200/70"
          )}
        >
          {file ? (
            <FileText className="size-8 text-slate-800" />
          ) : (
            <Upload className="size-8 text-slate-800" />
          )}

          <div className="ml-5 text-left">
            {!file && (
              <>
                <p className="text-lg font-semibold text-slate-950">
                  {hide ? "Uploaded" : dragging ? "Drop here" : "Upload a file"}
                </p>
                <p className="text-xs font-medium text-slate-600">
                  Only PDF files up to 50MB
                </p>
              </>
            )}
            {file && (
              <p className="my-3 flex justify-center text-xl font-medium tracking-tight text-black">
                {file?.name}
              </p>
            )}
          </div>
          <input
            type="file"
            id="data"
            accept=".pdf"
            disabled={hide}
            onChange={handleDataChange}
            className="hidden"
          />
        </div>
      </label>
    </div>
  )
}

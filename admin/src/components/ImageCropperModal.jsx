import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { X, Check, ZoomIn, ZoomOut, RotateCw, Maximize, Square, LayoutTemplate } from 'lucide-react'

// Helper to create a cropped image with rotation support
const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
  const image = await new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', (error) => reject(error))
    img.src = imageSrc
  })

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) return null

  const rotRad = (rotation * Math.PI) / 180
  const { width: bWidth, height: bHeight } = {
    width: Math.abs(Math.cos(rotRad) * image.width) + Math.abs(Math.sin(rotRad) * image.height),
    height: Math.abs(Math.sin(rotRad) * image.width) + Math.abs(Math.cos(rotRad) * image.height),
  }

  canvas.width = bWidth
  canvas.height = bHeight

  ctx.translate(bWidth / 2, bHeight / 2)
  ctx.rotate(rotRad)
  ctx.translate(-image.width / 2, -image.height / 2)
  ctx.drawImage(image, 0, 0)

  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height)
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  ctx.putImageData(data, 0, 0)

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob)
    }, 'image/jpeg', 0.95)
  })
}

export default function ImageCropperModal({ image, onCropComplete, onCancel, aspectRatio: initialAspect = 4 / 3 }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [aspect, setAspect] = useState(initialAspect)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const onCropChange = useCallback((newCrop) => setCrop(newCrop), [])
  const onZoomChange = useCallback((newZoom) => setZoom(newZoom), [])
  const onRotationChange = useCallback((newRot) => setRotation(newRot), [])

  const onCropAreaComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels)
  }, [])

  const handleDone = async () => {
    if (!croppedAreaPixels) return
    try {
      setIsProcessing(true)
      const croppedBlob = await getCroppedImg(image, croppedAreaPixels, rotation)
      if (croppedBlob) onCropComplete(croppedBlob)
    } catch (e) {
      console.error('Error cropping image:', e)
      alert('Failed to crop image.')
    } finally {
      setIsProcessing(false)
    }
  }

  const aspectPresets = [
    { label: 'Square', value: 1, icon: <Square size={14} /> },
    { label: 'Standard', value: 4 / 3, icon: <LayoutTemplate size={14} /> },
    { label: 'Wide', value: 16 / 9, icon: <Maximize size={14} /> },
  ]

  return (
    <div className="crop-modal-overlay">
      <div className="crop-modal-content">
        <div className="crop-header">
          <div className="flex justify-between items-center">
            <div>
              <h3>Adjust Category Image</h3>
              <p>Fine-tune orientation and framing</p>
            </div>
            <button onClick={onCancel} className="close-btn"><X size={20} /></button>
          </div>
        </div>

        <div className="crop-container-wrapper">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={onCropChange}
            onCropComplete={onCropAreaComplete}
            onZoomChange={onZoomChange}
            onRotationChange={onRotationChange}
            restrictPosition={true}
            showGrid={true}
            minZoom={1}
            maxZoom={5}
          />
        </div>

        <div className="crop-controls">
          <div className="control-tabs">
            <div className="aspect-selector">
              {aspectPresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  className={`preset-btn ${aspect === preset.value ? 'active' : ''}`}
                  onClick={() => setAspect(preset.value)}
                >
                  {preset.icon} {preset.label}
                </button>
              ))}
            </div>
            
            <button 
              type="button" 
              className="rotation-btn"
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
            >
              <RotateCw size={16} /> Rotate 90°
            </button>
          </div>

          <div className="zoom-slider-container">
            <ZoomOut size={16} className="zoom-icon" />
            <input
              type="range"
              value={zoom}
              min={1}
              max={5}
              step={0.05}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="zoom-range"
            />
            <ZoomIn size={16} className="zoom-icon" />
          </div>

          <div className="crop-actions">
            <button 
              type="button" 
              onClick={onCancel} 
              className="btn btn-ghost"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={handleDone} 
              className="btn btn-primary"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : <><Check size={18} /> Done Adjusting</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

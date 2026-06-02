Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'

$inputPath = Join-Path $PSScriptRoot '..\public\sba-logo-stamp.png'
$outputPath = Join-Path $PSScriptRoot '..\public\sba-logo-transparent.png'
$cleanOutputPath = Join-Path $PSScriptRoot '..\public\sba-logo-stamp-clean.png'

$src = [System.Drawing.Bitmap]::FromFile((Resolve-Path $inputPath))
$transparent = New-Object System.Drawing.Bitmap $src.Width, $src.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$minX = $src.Width
$minY = $src.Height
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $src.Height; $y++) {
  for ($x = 0; $x -lt $src.Width; $x++) {
    $pixel = $src.GetPixel($x, $y)
    $r = [int]$pixel.R
    $g = [int]$pixel.G
    $b = [int]$pixel.B
    $max = [Math]::Max($r, [Math]::Max($g, $b))
    $min = [Math]::Min($r, [Math]::Min($g, $b))
    $avg = ($r + $g + $b) / 3

    # Remove the baked-in checker/white preview background. It is bright, neutral
    # grey/white; the badge itself is black/gold and remains opaque.
    $isCheckerBackground = ($avg -gt 208 -and ($max - $min) -lt 24)

    if ($isCheckerBackground) {
      $transparent.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $r, $g, $b))
    }
    else {
      $transparent.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g, $b))
      if ($x -lt $minX) { $minX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}

$padding = 28
$cropX = [Math]::Max(0, $minX - $padding)
$cropY = [Math]::Max(0, $minY - $padding)
$cropRight = [Math]::Min($transparent.Width - 1, $maxX + $padding)
$cropBottom = [Math]::Min($transparent.Height - 1, $maxY + $padding)
$cropWidth = $cropRight - $cropX + 1
$cropHeight = $cropBottom - $cropY + 1

$cropped = New-Object System.Drawing.Bitmap $cropWidth, $cropHeight, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($cropped)
$graphics.Clear([System.Drawing.Color]::Transparent)
$graphics.DrawImage(
  $transparent,
  (New-Object System.Drawing.Rectangle 0, 0, $cropWidth, $cropHeight),
  (New-Object System.Drawing.Rectangle $cropX, $cropY, $cropWidth, $cropHeight),
  [System.Drawing.GraphicsUnit]::Pixel
)

$cropped.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Save($cleanOutputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$graphics.Dispose()
$cropped.Dispose()
$transparent.Dispose()
$src.Dispose()

Write-Output "Created $outputPath"

# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "images/services"
New-Item -ItemType Directory -Force -Path "images/icons"
New-Item -ItemType Directory -Force -Path "images/thumbs"

# Download service images
$services = @{
    "android-dev" = "https://www.example.com/android-dev.jpg"
    "cross-platform" = "https://www.example.com/cross-platform.jpg"
    "enterprise-mobile" = "https://www.example.com/enterprise.jpg"
    "mobile-ui" = "https://www.example.com/ui-design.jpg"
    "performance" = "https://www.example.com/performance.jpg"
    "backend" = "https://www.example.com/backend.jpg"
    "testing" = "https://www.example.com/testing.jpg"
    "maintenance" = "https://www.example.com/maintenance.jpg"
    "security" = "https://www.example.com/security.jpg"
    "integration" = "https://www.example.com/integration.jpg"
}

foreach ($service in $services.GetEnumerator()) {
    $outFile = "images/services/$($service.Key).jpg"
    Invoke-WebRequest -Uri $service.Value -OutFile $outFile
    
    # Create corresponding icon and thumbnail
    Copy-Item $outFile "images/icons/$($service.Key)-icon.png"
    Copy-Item $outFile "images/thumbs/$($service.Key)-thumb.png"
} 
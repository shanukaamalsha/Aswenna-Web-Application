$base = 'https://aswenna-8ed3e-default-rtdb.firebaseio.com/news.json'

# Delete all existing news first to avoid duplicates
Invoke-RestMethod -Uri 'https://aswenna-8ed3e-default-rtdb.firebaseio.com/news.json' -Method Delete

function Get-Base64Image {
    param([string]$path)
    $bytes = [System.IO.File]::ReadAllBytes($path)
    $b64 = [System.Convert]::ToBase64String($bytes)
    return "data:image/png;base64," + $b64
}

$thumb1 = Get-Base64Image "C:\Users\sandu\.gemini\antigravity\brain\37fe0319-01ba-4bab-9526-bd11344a55d7\fertilizer_news_thumb_1777217005753.png"
$thumb2 = Get-Base64Image "C:\Users\sandu\.gemini\antigravity\brain\37fe0319-01ba-4bab-9526-bd11344a55d7\rainfall_news_thumb_1777217026368.png"
$thumb3 = Get-Base64Image "C:\Users\sandu\.gemini\antigravity\brain\37fe0319-01ba-4bab-9526-bd11344a55d7\organic_news_thumb_1777217116469.png"

$articles = @(
  @{
    title = 'Government Announces New Fertilizer Subsidy for 2026'
    tagline = 'Major relief for Sri Lankan farmers this season'
    date = '2026-04-20'
    category = 'subsidies'
    description = 'The government has announced a new fertilizer subsidy program for the 2026 Yala season, providing essential nutrients at reduced costs to support local agricultural production and food security.'
    url = 'https://aswenna.lk/news/fertilizer-subsidy-2026'
    thumbnailUri = $thumb1
    createdBy = 'admin'
  },
  @{
    title = 'Heavy Rainfall Warning Issued for North-Central Province'
    tagline = 'Farmers advised to take precautionary measures'
    date = '2026-04-22'
    category = 'weather'
    description = 'The Meteorology Department has issued a heavy rainfall warning for the North-Central Province. Farmers are urged to harvest ready crops early and secure irrigation channels to prevent flood damage.'
    url = 'https://aswenna.lk/news/rainfall-warning-april-2026'
    thumbnailUri = $thumb2
    createdBy = 'admin'
  },
  @{
    title = 'New Organic Farming Regulations Effective from May 2026'
    tagline = 'Stricter standards for certified organic produce'
    date = '2026-04-25'
    category = 'government-policies'
    description = 'The Ministry of Agriculture has introduced new regulations governing organic farming certifications in Sri Lanka. The updated standards aim to enhance product quality and open new export markets for local farmers.'
    url = 'https://aswenna.lk/news/organic-farming-regulations-2026'
    thumbnailUri = $thumb3
    createdBy = 'admin'
  }
)

foreach ($article in $articles) {
  $body = $article | ConvertTo-Json -Depth 5 -Compress
  $response = Invoke-RestMethod -Uri $base -Method Post -Body $body -ContentType 'application/json'
  Write-Host "Added: $($article.title) -> $($response.name)"
}
Write-Host "Done! All 3 articles added to Firebase with thumbnails."

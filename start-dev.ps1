# Mata cualquier proceso en puerto 3333
$proc = netstat -ano | Select-String ":3333 " | ForEach-Object { $_ -replace '.*\s+(\d+)$', '$1' } | Select-Object -First 1
if ($proc) {
  Stop-Process -Id $proc -Force -ErrorAction SilentlyContinue
  Start-Sleep -Seconds 2
  Write-Host "Puerto 3333 liberado" -ForegroundColor Green
}

# Arranca el backend
Write-Host "Iniciando backend en puerto 3333..." -ForegroundColor Cyan
node ace serve --hmr

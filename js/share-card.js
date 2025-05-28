function generateShareCard(score, badge, username = '') {
    const canvas = document.getElementById('share-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 1200;
    canvas.height = 630;

    const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGradient.addColorStop(0, '#0a0a12');
    bgGradient.addColorStop(0.5, '#1a1a2e');
    bgGradient.addColorStop(1, '#0a0a12');
    
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.03;
    for (let i = 0; i < 2000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x, y, size, size);
    }
    ctx.globalAlpha = 1;

    for (let i = 0; i < 15; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 2 + Math.random() * 5;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
        glow.addColorStop(0, `rgba(145, 71, 255, ${0.3 + Math.random() * 0.3})`);
        glow.addColorStop(1, 'rgba(145, 71, 255, 0)');
        
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.strokeStyle = 'rgba(145, 71, 255, 0.3)';
    ctx.lineWidth = 15;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    const cornerSize = 100;
    ctx.strokeStyle = 'rgba(145, 71, 255, 0.5)';
    ctx.lineWidth = 8;

    ctx.beginPath();
    ctx.moveTo(0, cornerSize);
    ctx.lineTo(0, 0);
    ctx.lineTo(cornerSize, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width - cornerSize, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(canvas.width, cornerSize);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height - cornerSize);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(cornerSize, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width - cornerSize, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width, canvas.height - cornerSize);
    ctx.stroke();

    ctx.font = 'bold 72px "Poppins", sans-serif';
    ctx.textAlign = 'center';

    for (let i = 5; i >= 1; i--) {
        ctx.fillStyle = `rgba(145, 71, 255, ${i/20})`;
        ctx.fillText('YANISSSKUIZ', canvas.width / 2, 120 + i);
    }
    
    ctx.fillStyle = '#ffffff';
    ctx.fillText('YANISSSKUIZ', canvas.width / 2, 120);

    if (username) {
        ctx.font = 'italic 42px "Montserrat", sans-serif';
        ctx.fillStyle = 'rgba(176, 176, 192, 0.8)';

        const yPos = 180;
        for (let i = 0; i < username.length; i++) {
            const char = username[i];
            const xOffset = (i - username.length/2) * 24;
            const yOffset = Math.sin(Date.now()/500 + i) * 3;
            
            ctx.fillText(char, canvas.width/2 + xOffset, yPos + yOffset);
        }
    }

    const scoreText = `${score}%`;
    ctx.font = 'bold 140px "Poppins", sans-serif';

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillText(scoreText, canvas.width / 2 + 5, 325 + 5);

    const gradientScore = ctx.createLinearGradient(
        canvas.width / 2 - 200, 
        250, 
        canvas.width / 2 + 200, 
        350
    );
    
    const hue = (Date.now() / 50) % 360;
    gradientScore.addColorStop(0, `hsl(${hue}, 100%, 65%)`);
    gradientScore.addColorStop(0.5, `hsl(${(hue + 60) % 360}, 100%, 65%)`);
    gradientScore.addColorStop(1, `hsl(${(hue + 120) % 360}, 100%, 65%)`);
    
    ctx.fillStyle = gradientScore;
    ctx.fillText(scoreText, canvas.width / 2, 325);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 3;
    ctx.strokeText(scoreText, canvas.width / 2, 325);

    const badgeText = `${badge.name} ${badge.emoji}`;
    const badgeY = 400 + Math.sin(Date.now() / 800) * 5;

    ctx.fillStyle = 'rgba(26, 26, 46, 0.7)';
    const badgeWidth = ctx.measureText(badgeText).width + 40;
    const badgeHeight = 60;
    const badgeX = canvas.width / 2 - badgeWidth / 2;
    const borderRadius = 30;

    ctx.beginPath();
    ctx.moveTo(badgeX + borderRadius, badgeY - badgeHeight/2);
    ctx.lineTo(badgeX + badgeWidth - borderRadius, badgeY - badgeHeight/2);
    ctx.quadraticCurveTo(badgeX + badgeWidth, badgeY - badgeHeight/2, badgeX + badgeWidth, badgeY - badgeHeight/2 + borderRadius);
    ctx.lineTo(badgeX + badgeWidth, badgeY + badgeHeight/2 - borderRadius);
    ctx.quadraticCurveTo(badgeX + badgeWidth, badgeY + badgeHeight/2, badgeX + badgeWidth - borderRadius, badgeY + badgeHeight/2);
    ctx.lineTo(badgeX + borderRadius, badgeY + badgeHeight/2);
    ctx.quadraticCurveTo(badgeX, badgeY + badgeHeight/2, badgeX, badgeY + badgeHeight/2 - borderRadius);
    ctx.lineTo(badgeX, badgeY - badgeHeight/2 + borderRadius);
    ctx.quadraticCurveTo(badgeX, badgeY - badgeHeight/2, badgeX + borderRadius, badgeY - badgeHeight/2);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = badge.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.font = 'bold 36px "Poppins", sans-serif';
    ctx.fillStyle = badge.color;
    ctx.textAlign = 'center';
    ctx.fillText(badgeText, canvas.width / 2, badgeY + 12);

    ctx.font = 'italic 20px "Montserrat", sans-serif';
    ctx.fillStyle = 'rgba(176, 176, 192, 0.6)';
    ctx.textAlign = 'left';
    ctx.fillText('© 2025 Yanissska Kult', 30, canvas.height - 30);
    
    return canvas.toDataURL('image/png');
}

async function shareResults(score, badge, username = '') {
    try {
        const imageUrl = generateShareCard(score, badge, username);
        
        const blob = await (await fetch(imageUrl)).blob();
        const file = new File([blob], 'yanissskuiz-result.png', { type: blob.type });
        
        if (navigator.share) {
            await navigator.share({
                title: `🔥 J'ai obtenu ${score}% au Yanissskuiz !`,
                text: `Je suis "${badge.name}" ${badge.emoji}\nDécouvre ton niveau de fanitude !`,
                files: [file]
            });
        } else if (navigator.clipboard && navigator.clipboard.write) {
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob
                })
            ]);
            
            const toast = document.createElement('div');
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = '#9147ff';
            toast.style.color = 'white';
            toast.style.padding = '12px 24px';
            toast.style.borderRadius = '8px';
            toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            toast.style.zIndex = '1000';
            toast.style.fontFamily = '"Poppins", sans-serif';
            toast.textContent = '🎉 Image copiée dans le presse-papier !';
            
            document.body.appendChild(toast);
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 3000);
        } else {
            const a = document.createElement('a');
            a.href = imageUrl;
            a.download = `yanissskuiz-${username || 'anonymous'}-${score}percent.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    } catch (err) {
        console.error('Error sharing:', err);

        const text = `🎮 YANISSSKUIZ 🎮\n\n` +
                     `J'ai obtenu ${score}% et je suis "${badge.name}" ${badge.emoji}\n\n` +
                     `Catégories :\n` +
                     Object.entries(categories).map(([id, cat]) => 
                         `- ${cat.name}: ${Math.round((quizState.categoryScores[id].correct / quizState.categoryScores[id].total) * 100)}%`
                     ).join('\n') + `\n\n` +
                     `Teste toi aussi : yanissska.github.io/yanissskuiz`;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            
            const toast = document.createElement('div');
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.backgroundColor = '#9147ff';
            toast.style.color = 'white';
            toast.style.padding = '12px 24px';
            toast.style.borderRadius = '8px';
            toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            toast.style.zIndex = '1000';
            toast.style.fontFamily = '"Poppins", sans-serif';
            toast.textContent = '📋 Résultats copiés dans le presse-papier !';
            
            document.body.appendChild(toast);
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 3000);
        } else {
            const shareWindow = window.open('', '_blank', 'width=500,height=400');
            shareWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Partager mon résultat</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        textarea { 
                            width: 100%; 
                            height: 200px; 
                            margin: 20px 0; 
                            padding: 10px;
                            border: 2px solid #9147ff;
                            border-radius: 8px;
                        }
                        button {
                            background-color: #9147ff;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 8px;
                            cursor: pointer;
                        }
                    </style>
                </head>
                <body>
                    <h2>Partage tes résultats !</h2>
                    <p>Copie ce texte et partage-le :</p>
                    <textarea>${text}</textarea>
                    <button onclick="window.close()">Fermer</button>
                </body>
                </html>
            `);
        }
    }
}

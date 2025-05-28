const questions = [
    {
        text: "As-tu déjà regardé un live de Yanissska pendant plus de 2h d'affilée ?",
        category: "engagement"
    },
    {
        text: "Peux-tu citer au moins 5 emotes de Yanissska sans regarder ?",
        category: "knowledge"
    },
    {
        text: "As-tu déjà participé à un événement spécial sur son stream ?",
        category: "participation"
    },
    {
        text: "Connais-tu sa mascotte toute mimi là (t'sais le ptit bonhomme) ?",
        category: "knowledge"
    },
    {
        text: "As-tu déjà envoyé un sub pendant un stream petit fumier ?",
        category: "participation"
    },
    {
        text: "Suis-tu Yanissska sur au moins 2 autres réseaux en dehors de Twitch (être dans le serv discord ça compte) ?",
        category: "engagement"
    },
    {
        text: "Reconnais-tu Yanissska juste à sa voix sans voir le stream ?",
        category: "knowledge"
    },
    {
        text: "As-tu déjà utilisé des points de chaîne ?",
        category: "participation"
    },
    {
        text: "Peux-tu citer le nom d'au moins 2 modérateurs ?",
        category: "knowledge"
    },
    {
        text: "As-tu déjà recommandé Yanissska à des amis ?",
        category: "engagement"
    },
    {
        text: "As-tu la réf du Yanisss4:3 ?",
        category: "knowledge"
    },
    {
        text: "As-tu déjà parlé dans le chat twitch ou commenté sur tiktok ?",
        category: "engagement"
    },
    {
        text: "Tu savais que j'ai été youtubeur podcast avant d'être streameur ?",
        category: "knowledge"
    },
    {
        text: "As-tu déjà clipé sur twitch un moment historique ?",
        category: "participation"
    },
    {
        text: "As-tu connu les sons IA sur LKH , rykouro et yanissska ?",
        category: "knowledge"
    },
    {
        text: "As-tu déjà mis le #fuckyanis sur un chat twitch ?",
        category: "participation"
    },
    {
        text: "Connaissais-tu l'heure habituelle de ses streams ? Donc 21h pour le démarrage",
        category: "knowledge"
    },
    {
        text: "As-tu déjà regardé une VOD parce que t'as raté le live ?",
        category: "engagement"
    },
    {
        text: "Savais-tu que yanis le grand goat (oui j'ai de l'égo) est bosniaque ?",
        category: "knowledge"
    },
    {
        text: "As-tu déjà parlé sur le serveur discord (si non bah rejoins fumier) ?",
        category: "participation"
    },
    {
        text: "As-tu la notif pour ses streams ?",
        category: "engagement"
    },
    {
        text: "As-tu pris connaissance du cosplay féminin que j'ai fait ?",
        category: "knowledge"
    },
    {
        text: "As-tu déjà fait une création pour le goat (yanissska en gros) genre fanart, troll ou quoi ?",
        category: "participation"
    },
    {
        text: "Tu savais que je m'appelle tabouléprime sur valorantooo ?",
        category: "knowledge"
    },
    {
        text: "as-tu déjà lurk sur la chaine (en gros laisser le stream ouvert en arrière plan)",
        category: "engagement"
    },
    {
        text: "Est-ce que tu le connais depuis tiktok ?",
        category: "knowledge"
    },
    {
        text: "As-tu déjà participé à un jeu ou autre activié avec le chat proposé pendant stream ?",
        category: "participation"
    }
];

const categories = {
    engagement: {
        name: "Engagement",
        description: "Ton implication dans la communauté"
    },
    knowledge: {
        name: "Connaissance",
        description: "Ce que tu sais sur Yanissska"
    },
    participation: {
        name: "Participation",
        description: "Tes interactions avec le stream"
    }
};

// Badges configuration
const badges = [
    { min: 0, max: 30, name: "Nouveau Viewer", emoji: "👶", color: "#9e9e9e" },
    { min: 31, max: 50, name: "Fan Occasionnel", emoji: "🙂", color: "#4caf50" },
    { min: 51, max: 70, name: "Fan Régulier", emoji: "👍", color: "#2196f3" },
    { min: 71, max: 85, name: "Super Fan", emoji: "🔥", color: "#ff9800" },
    { min: 86, max: 95, name: "Ultra Fan", emoji: "💜", color: "#9c27b0" },
    { min: 96, max: 100, name: "Yanissska Expert", emoji: "🏆", color: "#ffeb3b" }
];

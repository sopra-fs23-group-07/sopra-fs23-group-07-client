import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IconButton from "@mui/material/IconButton";
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';
import ButtonGroup from "@mui/material/ButtonGroup";

const buildUrl = (base, params) => {
    const query = Object.keys(params)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');

    return `${base}?${query}`;
}

const handleShare = url => {
    try {
        window.open(url, "_blank", "noopener noreferrer");
    } catch (error) {
        console.error("Failed to open url", error);
    }
};

const WhatsAppShareButton = ({ message }) => {
    const url = buildUrl('https://wa.me/', { text: `Check this out: ${window.location.href}` });
    return (
        <IconButton onClick={() => handleShare(url)} size="large" color={"primary"}>
            <WhatsAppIcon fontSize="inherit"/>
        </IconButton>
    );
}

const TelegramShareButton = ({ message }) => {
    const url = buildUrl('https://t.me/share/url', { url: window.location.href, text: message });
    return (
        <IconButton onClick={() => handleShare(url)} size="large" color={"primary"}>
            <TelegramIcon/>
        </IconButton>
    );
}

const EmailShareButton = ({ message }) => {
    const url = `mailto:?subject=${encodeURIComponent(message)}&body=${encodeURIComponent('Check this out: ' + window.location.href)}`;
    return (
        <IconButton onClick={() => handleShare(url)} size="large" color={"primary"}>
            <EmailIcon/>
        </IconButton>
    );
}

const ShareButtons = ({ message }) => (
    <ButtonGroup>
        <WhatsAppShareButton message={message}/>
        <TelegramShareButton message={message}/>
        <EmailShareButton message={message}/>
    </ButtonGroup>
);

export default ShareButtons;

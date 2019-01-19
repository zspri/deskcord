const config = require('./config.json');
const Discord = require('discord.js');
var markdown = require('markdown').markdown;
const client = new Discord.Client();
var currentGuild = null;
var currentGuildId = null;
var currentChannel = null;
var currentChannelId = null;

client.on('ready', () => {
    $(".guilds").html("");
    var guilds = client.guilds;
    console.log(guilds);
    var ordered = []
    guilds.forEach(function(guild) {
        ordered[guild.position ? guild.position : ordered.length] = guild;
    });
    ordered.forEach(function(guild) {
        var img = guild.iconURL ? `<img src="${guild.iconURL}" width="35" height="35">` : `<div style="text-align:center;height:35px"><span style="display:block;vertical-align:middle">${guild.name.match(/\b(\w)/g).join('')}</span></div>`;
        $(".guilds").append(`<a class="guild" aria-value="${guild.id}">${img}</a>`);
    });
    $(".main").html("");
    console.log(ordered);

    // Events

    $(".guild").click(function() {
        $(this).addClass("active");
        $(`.guild[aria-value="${currentGuildId}"]`).removeClass("active");
        currentGuildId = $(this).attr("aria-value");
        currentGuild = client.guilds.find("id", currentGuildId);
        $(".guild-name").html(currentGuild.name);
        $(".guild-channels").html("");
        var orderedChannels = [];
        currentGuild.channels.forEach(function(channel) {
            orderedChannels[channel.position] = channel;
        });
        orderedChannels.forEach(function(channel) {
            var prefix = "";
            switch(channel.type) {
                case "text":
                    prefix = "#";
                    break;
                case "voice":
                    prefix = "<i class='fas fa-volume-up'></i> ";
                    break;
                default:
                    break;
            }
            if (channel.type == "text") {
                $(".guild-channels").append(`<div onclick="renderer.loadChannel(this)" class="channel ${channel.type}" aria-value="${channel.id}"><span class="channelprefix">${prefix}</span><span class="channel-name">${channel.name}</span></div>`);
            }
        });
    });
});

function escapeHtml(text) {
    'use strict';
    return text.replace(/[\"&<>]/g, function (a) {
        return {'<': '&lt;', '>': '&gt;' }[a];
    });
}

function loadChannel(t) {
    $(t).addClass("active");
    $(`.guild-channel[aria-value="${currentChannelId}"]`).removeClass("active");
    currentChannelId = $(t).attr("aria-value");
    currentChannel = currentGuild.channels.find("id", currentChannelId);
    $(".sidenav").removeClass("hidden");
    $(".main").html("");
    currentChannel.fetchMessages({"limit": 100})
        .then(messages => messages.forEach(function(message) {
            var msgContent = markdown.toHTML(escapeHtml(message.cleanContent));
            $(".main").append(`
                <div class="message">
                    <div class="data">
                        <div class="author">${message.author.username} <small>${message.createdAt}</small></div>
                        <div class="content">` + msgContent + `</div>
                    </div>
                </div>`);
        }))
        .catch(console.error);
}

module.exports = {
    client,
    loadChannel,
    currentGuild,
    currentChannel,
    currentGuildId,
    currentChannelId
}

client.login(config.token);

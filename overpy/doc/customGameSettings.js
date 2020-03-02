/* 
 * This file is part of OverPy (https://github.com/Zezombye/overpy).
 * Copyright (c) 2019 Zezombye.
 * 
 * This program is free software: you can redistribute it and/or modify  
 * it under the terms of the GNU General Public License as published by  
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU 
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License 
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

const customGameSettingsSchema = 
//begin-json
{
    "main": {
        "values": {
            "description": {
                "guid": "00000001007F",
                "values": "_string",
                "maxBytes": 512,
                "en-US": "Description",
                "de-DE": "Beschreibung",
                "es-ES": "Descripción",
                "es-MX": "Descripción",
                "it-IT": "Descrizione",
                "ja-JP": "説明",
                "ko-KR": "설명",
                "pl-PL": "Opis",
                "pt-BR": "Descrição",
                "ru-RU": "Описание",
                "zh-CN": "描述",
                "zh-TW": "敘述"
            }
        },
        "guid": "00000001006E",
        "en-US": "main",
        "de-DE": "hauptregeln",
        "es-ES": "principales",
        "es-MX": "principal",
        "fr-FR": "principal",
        "it-IT": "principale",
        "ja-JP": "メイン",
        "pl-PL": "główne",
        "pt-BR": "principal",
        "zh-CN": "主程序",
        "zh-TW": "主要"
    },
    "lobby": {
        "values": {
            "mapRotation": {
                "values": {
                    "paused": {
                        "guid": "000000004125",
                        "en-US": "Paused",
                        "de-DE": "Pausiert",
                        "es-ES": "En pausa",
                        "es-MX": "En pausa",
                        "fr-FR": "En pause",
                        "it-IT": "In pausa",
                        "ja-JP": "停止",
                        "ko-KR": "일시정지",
                        "pl-PL": "Pauza",
                        "pt-BR": "Pausado",
                        "ru-RU": "Отключена",
                        "zh-CN": "暂停轮换",
                        "zh-TW": "暫停"
                    }
                },
                "guid": "000000004122",
                "en-US": "Map Rotation",
                "de-DE": "Kartenrotation",
                "es-ES": "Rotación de mapas",
                "es-MX": "Rotación de mapas",
                "fr-FR": "Rotation des cartes",
                "it-IT": "Rotazione mappe",
                "ja-JP": "マップ・ローテーション",
                "ko-KR": "전장 전환",
                "pl-PL": "Rotacja map",
                "pt-BR": "Rotação dos mapas",
                "ru-RU": "Смена полей боя",
                "zh-CN": "地图轮换",
                "zh-TW": "更換地圖"
            },
            "returnToLobby": {
                "values": {
                    "never": {
                        "guid": "000000002C5A",
                        "default": true,
                        "en-US": "Never",
                        "de-DE": "Nie",
                        "es-ES": "Nunca",
                        "es-MX": "Nunca",
                        "fr-FR": "Jamais",
                        "it-IT": "Mai",
                        "ja-JP": "いいえ",
                        "ko-KR": "안 함",
                        "pl-PL": "Nigdy",
                        "pt-BR": "Nunca",
                        "ru-RU": "Отключен",
                        "zh-CN": "从不",
                        "zh-TW": "從不"
                    }
                },
                "guid": "000000002C4C",
                "en-US": "Return To Lobby",
                "de-DE": "Zurück zur Lobby",
                "es-ES": "Volver a sala",
                "es-MX": "Ir a sala de espera",
                "fr-FR": "Retour au salon",
                "it-IT": "Torna alla lobby",
                "ja-JP": "ロビーに戻る",
                "ko-KR": "대기실로 돌아가기",
                "pl-PL": "Powrót do poczekalni",
                "pt-BR": "Voltar ao lobby",
                "ru-RU": "Возврат в лобби",
                "zh-CN": "返回大厅",
                "zh-TW": "返回大廳"
            },
            "team1Slots": {
                "guid": "000000005A91",
                "values": "_int",
                "min": 0,
                "max": 6,
                "default": 6,
                "en-US": "Max %1$s Players",
                "de-DE": "Max. Anzahl Spieler %1$s",
                "es-ES": "Máximo de jugadores de %1$s",
                "es-MX": "Máximo de jugadores para %1$s",
                "fr-FR": "Joueurs max. dans %1$s.",
                "it-IT": "Massimo %1$s giocatori",
                "ja-JP": "%1$sの最大プレイヤー数",
                "ko-KR": "최대 %1$s 플레이어 수",
                "pl-PL": "Maksimum graczy: %1$s",
                "pt-BR": "Máximo de jogadores de %1$s",
                "ru-RU": "Максимум игроков команда %1$s",
                "zh-CN": "玩家上限 %1$s",
                "zh-TW": "玩家上限%1$s人"
            },
            "team2Slots": {
                "guid": "000000005A91",
                "values": "_int",
                "min": 0,
                "max": 6,
                "default": 6,
                "en-US": "Max %1$s Players",
                "de-DE": "Max. Anzahl Spieler %1$s",
                "es-ES": "Máximo de jugadores de %1$s",
                "es-MX": "Máximo de jugadores para %1$s",
                "fr-FR": "Joueurs max. dans %1$s.",
                "it-IT": "Massimo %1$s giocatori",
                "ja-JP": "%1$sの最大プレイヤー数",
                "ko-KR": "최대 %1$s 플레이어 수",
                "pl-PL": "Maksimum graczy: %1$s",
                "pt-BR": "Máximo de jogadores de %1$s",
                "ru-RU": "Максимум игроков команда %1$s",
                "zh-CN": "玩家上限 %1$s",
                "zh-TW": "玩家上限%1$s人"
            },
            "ffaSlots": {
                "guid": "000000006ABB",
                "values": "_int",
                "min": 0,
                "max": 12,
                "default": 12,
                "en-US": "Max FFA Players",
                "de-DE": "Max. Anzahl Spieler FFA",
                "es-ES": "Máx. de jugadores para TcT",
                "es-MX": "Máximo de jugadores TCT",
                "fr-FR": "Maximum de joueurs en Chacun pour soi",
                "it-IT": "Numero massimo di giocatori TCT",
                "ja-JP": "FFA最大プレイヤー数",
                "ko-KR": "개별 전투 최대 인원",
                "pl-PL": "Maksimum graczy FFA",
                "pt-BR": "Máximo de jogadores para TCT",
                "ru-RU": "Максимум игроков FFA",
                "zh-CN": "自由混战人数上限",
                "zh-TW": "自由混戰人數上限"
            },
            "spectatorSlots": {
                "values": "_int",
                "min": 0,
                "max": 12,
                "default": 2,
                "guid": "000000005A92",
                "en-US": "Max Spectators",
                "de-DE": "Max. Anzahl Zuschauer",
                "es-ES": "Máximo de observadores",
                "es-MX": "Cantidad máxima de espectadores",
                "fr-FR": "Spectateurs max.",
                "it-IT": "Numero massimo di spettatori",
                "ja-JP": "最大観戦者数",
                "ko-KR": "최대 관전자 수",
                "pl-PL": "Maksimum obserwatorów",
                "pt-BR": "Máximo de espectadores",
                "ru-RU": "Максимум зрителей",
                "zh-CN": "观战者人数上限",
                "zh-TW": "觀戰人數上限"
            },
            "allowPlayersInQueue": {
                "values": "_boolYesNo",
                "default": "no",
                "guid": "00000000F25B",
                "en-US": "Allow Players Who Are In Queue",
                "de-DE": "Spieler in der Spielsuche zulassen",
                "es-ES": "Permitir jugadores que estén en cola",
                "es-MX": "Permite jugadores en cola",
                "fr-FR": "Autoriser les joueurs en file d’attente",
                "it-IT": "Ammetti giocatori in coda",
                "ja-JP": "待機中のプレイヤーを許可",
                "ko-KR": "대기열에 등록된 플레이어들도 허용",
                "pl-PL": "Pozwól na dołączanie graczy z kolejki",
                "pt-BR": "Permitir jogadores na fila",
                "ru-RU": "Открыть для игроков в очереди",
                "zh-CN": "队列中的玩家可以加入",
                "zh-TW": "佇列中的玩家可進行"
            },
            "enableMatchVoiceChat": {
                "values": "_boolEnabled",
                "default": "disabled",
                "guid": "000000006A04",
                "en-US": "Match Voice Chat",
                "de-DE": "Voicechat Match",
                "es-ES": "Chat de voz en partida",
                "es-MX": "Chat de voz de partida",
                "fr-FR": "Discussion audio de partie",
                "it-IT": "Chat vocale della partita",
                "ja-JP": "マッチ・ボイスチャット",
                "ko-KR": "경기 음성 대화",
                "pl-PL": "Czat głosowy meczu",
                "pt-BR": "Chat de voz da partida",
                "ru-RU": "Голосовой чат матча",
                "zh-CN": "比赛语音聊天",
                "zh-TW": "對戰語音聊天"
            }
        },
        "guid": "000000010031",
        "en-US": "lobby",
        "de-DE": "Lobby",
        "es-ES": "sala",
        "es-MX": "sala de espera",
        "fr-FR": "salon",
        "ja-JP": "ロビー",
        "pl-PL": "poczekalnia",
        "zh-CN": "大厅",
        "zh-TW": "大廳"
    },
    "gamemodes": {
        "values": {
            "general": {
                "guid": "0000000058DA",
                "values": {
                    "gamemodeStartTrigger": {
                        "values": {
                            "manual": {
                                "guid": "000000005A13",
                                "en-US": "Manual",
                                "de-DE": "Manuell",
                                "fr-FR": "Manuel",
                                "it-IT": "Manuale",
                                "ja-JP": "手動",
                                "ko-KR": "수동",
                                "pl-PL": "Ręcznie",
                                "ru-RU": "Вручную",
                                "zh-CN": "手动",
                                "zh-TW": "手動"
                            }
                        },
                        "guid": "000000005A10",
                        "en-US": "Game Mode Start",
                        "de-DE": "Start des Spielmodus",
                        "es-ES": "Inicio del modo de juego",
                        "es-MX": "Iniciar modo de juego",
                        "fr-FR": "Début de la partie",
                        "it-IT": "Avvio partita",
                        "ja-JP": "ゲーム・モード開始",
                        "ko-KR": "게임 모드 시작",
                        "pl-PL": "Rozpoczęcie gry",
                        "pt-BR": "Iniciar modo de jogo",
                        "ru-RU": "Начало матча в режиме",
                        "zh-CN": "比赛模式开始",
                        "zh-TW": "開始遊戲模式"
                    },
                    "heroLimit": {
                        "values": {
                            "off": {
                                "guid": "000000005891",
                                "en-US": "Off",
                                "de-DE": "Aus",
                                "es-ES": "Desactivado",
                                "es-MX": "No",
                                "fr-FR": "Désactivé",
                                "ja-JP": "OFF",
                                "ko-KR": "비활성화",
                                "pl-PL": "Wył.",
                                "pt-BR": "Desligado",
                                "ru-RU": "Откл.",
                                "zh-CN": "关闭",
                                "zh-TW": "關閉"
                            }
                        },
                        "guid": "000000005890",
                        "en-US": "Hero Limit",
                        "de-DE": "Heldenbegrenzung",
                        "es-ES": "Límite de héroes",
                        "es-MX": "Límite de héroes",
                        "fr-FR": "Limite de héros",
                        "it-IT": "Limite eroi",
                        "ja-JP": "ヒーロー制限",
                        "ko-KR": "영웅 제한",
                        "pl-PL": "Limit bohaterów",
                        "pt-BR": "Limite de heróis",
                        "ru-RU": "Лимит героев",
                        "zh-CN": "英雄限制",
                        "zh-TW": "相同英雄限制"
                    },
                    "enabledMaps": {
                        "guid": "000000010045",
                        "en-US": "enabled maps",
                        "de-DE": "verfügbare karten",
                        "es-ES": "mapas permitidos",
                        "es-MX": "mapas habilitados",
                        "fr-FR": "cartes activées",
                        "it-IT": "mappe abilitate",
                        "ja-JP": "有効なマップ",
                        "pl-PL": "dostępne mapy",
                        "pt-BR": "mapas ativados",
                        "zh-CN": "启用地图",
                        "zh-TW": "啟用的地圖"
                    }
                },
                "en-US": "General",
                "de-DE": "Allgemein",
                "fr-FR": "Général",
                "it-IT": "Generale",
                "ja-JP": "一般",
                "ko-KR": "일반",
                "pl-PL": "Ogólne",
                "pt-BR": "Geral",
                "ru-RU": "Общие",
                "zh-CN": "综合",
                "zh-TW": "一般"
            }
        },
        "guid": "000000010044",
        "en-US": "modes",
        "de-DE": "modi",
        "es-ES": "modos",
        "es-MX": "modos",
        "it-IT": "modalità",
        "ja-JP": "モード",
        "pl-PL": "tryby gry",
        "pt-BR": "modos",
        "zh-CN": "模式",
        "zh-TW": "模式"
    },
    "heroes": {
        "teams": {
            "allTeams": {
                "guid": "0000000058DA",
                "en-US": "General",
                "de-DE": "Allgemein",
                "fr-FR": "Général",
                "it-IT": "Generale",
                "ja-JP": "一般",
                "ko-KR": "일반",
                "pl-PL": "Ogólne",
                "pt-BR": "Geral",
                "ru-RU": "Общие",
                "zh-CN": "综合",
                "zh-TW": "一般"
            },
            "team1": {
                "guid": "00000000B472",
                "en-US": "Team 1",
                "es-MX": "Equipo 1",
                "fr-FR": "Équipe 1",
                "ja-JP": "チーム1",
                "pt-BR": "Equipe 1",
                "zh-CN": "队伍1"
            },
            "team2": {
                "guid": "00000000B471",
                "en-US": "Team 2",
                "es-MX": "Equipo 2",
                "fr-FR": "Équipe 2",
                "ja-JP": "チーム2",
                "pt-BR": "Equipe 2",
                "zh-CN": "队伍2"
            },
            "ffa": {
                "guid": "000000010051",
                "en-US": "Team FFA",
                "de-DE": "Team-FFA",
                "es-ES": "TcT por equipos",
                "es-MX": "Equipo TCT",
                "fr-FR": "Combat à mort par équipe",
                "it-IT": "TCT a squadre",
                "ja-JP": "チームFFA",
                "ko-KR": "팀 개별 전투",
                "pl-PL": "Drużynowe FFA",
                "pt-BR": "TCT em equipe",
                "ru-RU": "Командный FFA",
                "zh-CN": "团队混战",
                "zh-TW": "隊伍自由混戰"
            }
        },
        "values": {
            "_generalButNotEachHero": {
                "abilityCooldown%": {
                    "values": "_percent",
                    "min": 0,
                    "max": 500,
                    "default": 100,
                    "guid": "0000000058A0",
                    "en-US": "Ability Cooldown Time",
                    "de-DE": "Abklingzeit",
                    "es-ES": "Tiempo de reutilización de la habilidad",
                    "es-MX": "Tiempo de reutilización de habilidad",
                    "fr-FR": "Temps de recharge de la capacité",
                    "it-IT": "Tempo di recupero delle abilità",
                    "ja-JP": "アビリティのクールダウン時間",
                    "ko-KR": "기술 재사용 대기시간",
                    "pl-PL": "Czas odnowienia zdolności",
                    "pt-BR": "Tempo de recarga da habilidade",
                    "ru-RU": "Восстановление способностей",
                    "zh-CN": "技能冷却时间",
                    "zh-TW": "技能冷卻時間"
                }
            },
            "_generalAndEachHero": {
                "ultGen%": {
                    "values": "_percent",
                    "min": 10,
                    "max": 500,
                    "default": 100,
                    "guid": "0000000058AA",
                    "en-US": "Ultimate Generation",
                    "de-DE": "Ultimeteraufladung",
                    "es-ES": "Carga de habilidad definitiva",
                    "es-MX": "Generación de la habilidad máxima",
                    "fr-FR": "Génération de capacité ultime",
                    "it-IT": "Generazione Ultra",
                    "ja-JP": "アルティメット・チャージ",
                    "ko-KR": "궁극기 충전율",
                    "pl-PL": "Ładowanie Superzdolności",
                    "pt-BR": "Geração de Supremo",
                    "ru-RU": "Зарядка суперспособностей",
                    "zh-CN": "终极技能充能速度",
                    "zh-TW": "絕招蓄力速度"
                },
                "damageDealt%": {
                    "values": "_percent",
                    "min": 10,
                    "max": 500,
                    "default": 100,
                    "guid": "0000000058A1",
                    "en-US": "Damage Dealt",
                    "de-DE": "Verursachter Schaden",
                    "es-ES": "Daño infligido",
                    "es-MX": "Daño infligido",
                    "fr-FR": "Dégâts infligés",
                    "it-IT": "Danni inflitti",
                    "ja-JP": "与ダメージ",
                    "ko-KR": "주는 피해",
                    "pl-PL": "Zadane obrażenia",
                    "pt-BR": "Dano causado",
                    "ru-RU": "Наносимый урон",
                    "zh-CN": "伤害量",
                    "zh-TW": "造成的傷害"
                },
                "damageReceived%": {
                    "values": "_percent",
                    "min": 10,
                    "max": 500,
                    "default": 100,
                    "guid": "0000000058A2",
                    "en-US": "Damage Received",
                    "de-DE": "Erlittener Schaden",
                    "es-ES": "Daño recibido",
                    "es-MX": "Daño recibido",
                    "fr-FR": "Dégâts subis",
                    "it-IT": "Danni subiti",
                    "ja-JP": "被ダメージ",
                    "ko-KR": "받는 피해",
                    "pl-PL": "Otrzymane obrażenia",
                    "pt-BR": "Dano recebido",
                    "ru-RU": "Получаемый урон",
                    "zh-CN": "受到伤害量",
                    "zh-TW": "受到的傷害"
                },
                "enableInfiniteAmmo": {
                    "values": "_boolOnOff",
                    "default": "off",
                    "exclude": [
                        "brigitte",
                        "dva",
                        "hanzo",
                        "moira",
                        "reinhardt",
                        "sigma"
                    ],
                    "guid": "000000005ECD",
                    "en-US": "No Ammunition Requirement",
                    "de-DE": "Unbegrenzte Munition",
                    "es-ES": "Munición infinita",
                    "es-MX": "Sin requisitos de munición",
                    "fr-FR": "Munitions illimitées",
                    "it-IT": "Munizioni illimitate",
                    "ja-JP": "弾数制限なし",
                    "ko-KR": "탄창 제한 없음",
                    "pl-PL": "Brak wymogów amunicyjnych",
                    "pt-BR": "Sem requerimentos de munição",
                    "ru-RU": "Бесконечный боекомплект",
                    "zh-CN": "无需装弹",
                    "zh-TW": "無限彈藥"
                }
            },
            "disabledHeroes": {
                "guid": "000000010052",
                "en-US": "disabled heroes",
                "de-DE": "deaktivierte helden",
                "es-ES": "héroes no permitidos",
                "es-MX": "héroes deshabilitados",
                "fr-FR": "héros désactivés",
                "it-IT": "eroi disabilitati",
                "ja-JP": "無効なヒーロー",
                "pl-PL": "niedostępni bohaterowie",
                "pt-BR": "heróis desativados",
                "zh-CN": "禁用英雄",
                "zh-TW": "停用的英雄"
            },
            "enabledHeroes": {
                "guid": "000000010053",
                "en-US": "enabled heroes",
                "de-DE": "verfügbare helden",
                "es-ES": "héroes permitidos",
                "es-MX": "héroes habilitados",
                "fr-FR": "héros activés",
                "it-IT": "eroi abilitati",
                "ja-JP": "有効なヒーロー",
                "pl-PL": "dostępni bohaterowie",
                "pt-BR": "heróis ativados",
                "zh-CN": "启用英雄",
                "zh-TW": "啟用的英雄"
            },
        },
        "guid": "000000010046",
        "en-US": "heroes",
        "de-DE": "helden",
        "es-ES": "héroes",
        "es-MX": "héroes",
        "fr-FR": "héros",
        "it-IT": "eroi",
        "ja-JP": "ヒーロー",
        "pl-PL": "bohaterowie",
        "pt-BR": "heróis",
        "zh-CN": "英雄",
        "zh-TW": "英雄"
    }
}
//end-json

const availableLanguages = ["de-DE", "en-US", "es-ES", "es-MX", "fr-FR", "it-IT", "ja-JP", "ko-KR", "pl-PL", "pt-BR", "ru-RU", "zh-CN", "zh-TW"];

//Resolve guids for the max team players
for (var key of Object.keys(customGameSettingsSchema.lobby.values.team1Slots)) {
    if (availableLanguages.includes(key)) {
        customGameSettingsSchema.lobby.values.team1Slots[key] = customGameSettingsSchema.lobby.values.team1Slots[key].replace("%1$s", constantValues.Team["1"][key])
    }
}
for (var key of Object.keys(customGameSettingsSchema.lobby.values.team2Slots)) {
    if (availableLanguages.includes(key)) {
        customGameSettingsSchema.lobby.values.team2Slots[key] = customGameSettingsSchema.lobby.values.team2Slots[key].replace("%1$s", constantValues.Team["2"][key])
    }
}

//Add translations for each gamemode
for (var gamemode of Object.keys(gamemodeKw)) {
    if (!(gamemode in customGameSettingsSchema.gamemodes.values)) {
        customGameSettingsSchema.gamemodes.values[gamemode] = {};
        customGameSettingsSchema.gamemodes.values[gamemode].values = {};
    }
    Object.assign(customGameSettingsSchema.gamemodes.values[gamemode], gamemodeKw[gamemode])
}

//Apply general settings to each gamemode
for (var key of Object.keys(customGameSettingsSchema.gamemodes.values)) {
    Object.assign(customGameSettingsSchema.gamemodes.values[key].values, customGameSettingsSchema.gamemodes.values.general.values);
}

//Generate settings for heroes.general
customGameSettingsSchema.heroes.values.general = Object.assign({}, customGameSettingsSchema.heroes.values._generalAndEachHero, customGameSettingsSchema.heroes.values._generalButNotEachHero)

//Generate settings for each hero
for (var hero of Object.keys(heroKw)) {

    if (!(hero in customGameSettingsSchema.heroes.values)) {
        customGameSettingsSchema.heroes.values[hero] = {};
        customGameSettingsSchema.heroes.values[hero].values = {};
    }

    var eachHero = Object.assign({}, customGameSettingsSchema.heroes.values._generalAndEachHero, customGameSettingsSchema.heroes.values._eachHero)

    for (var key of Object.keys(eachHero)) {
        if ("include" in eachHero[key] && eachHero[key].include.includes(hero)
                || "exclude" in eachHero[key] && !eachHero[key].exclude.includes(hero)
                || !("include" in eachHero[key]) && !("exclude" in eachHero[key])) {
                    
            var destKey = (key === "enableGenericSecondaryFire" ? "enableSecondaryFire" : key)
            customGameSettingsSchema.heroes.values[hero].values[destKey] = JSON.parse(JSON.stringify(eachHero[key]));

            var heroValue = customGameSettingsSchema.heroes.values[hero].values[destKey];

            if ([
                "secondaryFireCooldown%", "enableSecondaryFire", "secondaryFireMaximumTime%", "secondaryFireRechargeRate%",
                "ability3Cooldown%", "enableAbility3", 
                "ability2Cooldown%", "enableAbility2", 
                "ability1Cooldown%", "enableAbility1", 
                "enablePassive", 
                "enableUlt", "ultGen%", "combatUltGen%", "passiveUltGen%"
            ].includes(key)) {
                for (var key2 of Object.keys(heroValue)) {
                    if (availableLanguages.includes(key2)) {

                        if (["secondaryFireCooldown%", "enableSecondaryFire", "secondaryFireMaximumTime%", "secondaryFireRechargeRate%"].includes(key)) {
                            heroValue[key2] = heroValue[key2].replace("%1$s", heroKw[hero].secondaryFire[key2])

                        } else if (["ability3Cooldown%", "enableAbility3"].includes(key)) {
                            heroValue[key2] = heroValue[key2].replace("%1$s", heroKw[hero].ability3[key2])
                        } else if (["ability2Cooldown%", "enableAbility2"].includes(key)) {
                            heroValue[key2] = heroValue[key2].replace("%1$s", heroKw[hero].ability2[key2])
                        } else if (["ability1Cooldown%", "enableAbility1"].includes(key)) {
                            heroValue[key2] = heroValue[key2].replace("%1$s", heroKw[hero].ability1[key2])
                        } else if (["enablePassive"].includes(key)) {
                            heroValue[key2] = heroValue[key2].replace("%1$s", heroKw[hero].passive[key2])
                        } else if (["enableUlt", "ultGen%", "combatUltGen%", "passiveUltGen%"].includes(key)) {
                            heroValue[key2] = heroValue[key2]+" "+heroKw[hero].ultimate[key2]
                        }
                    }
                }
            }
        }
    }
}

delete customGameSettingsSchema.heroes.values._generalAndEachHero
delete customGameSettingsSchema.heroes.values._eachHero
delete customGameSettingsSchema.heroes.values._generalButNotEachHero

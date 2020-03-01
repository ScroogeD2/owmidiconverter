// Custom game settings (lobby settings + workshop script) can only be imported 
// if their language matches the text language of the game.

// Lobby settings translations are needed until OverPy can decompile, compile and translate them
const BASE_LOBBY_SETTINGS = {
	"en-US": `settings
{
	main
	{
		Description: "Overwatch MIDI Pianist mode by ScroogeD. To avoid crashes, make sure to click Back To Lobby if already in game, then start game normally. Convert MIDI songs to Overwatch piano songs with this converter on GitHub: github.com/ScroogeD2/owmidiconverter"
	}
	
	lobby
	{
		Map Rotation: Paused
		Match Voice Chat: Enabled
		Return To Lobby: Never
	}

	modes
	{
		Deathmatch
		{
			enabled maps
			{
				Paris
			}
		}

		General
		{
			Game Mode Start: Manual
			Hero Limit: Off
		}
	}

	heroes
	{
		General
		{
			Ability Cooldown Time: 0%
			Damage Dealt: 500%
			Damage Received: 500%
			No Ammunition Requirement: On
			Ultimate Generation: 250%
		}
	}
}`,
	"de-DE": `einstellungen
{
	hauptregeln
	{
		Beschreibung: "Overwatch MIDI Pianist mode by ScroogeD. To avoid crashes, make sure to click Back To Lobby if already in game, then start game normally. Convert MIDI songs to Overwatch piano songs with this converter on GitHub: github.com/ScroogeD2/owmidiconverter"
	}

	Lobby
	{
		Kartenrotation: Pausiert
		Voicechat Match: Aktiviert
		Zurück zur Lobby: Nie
	}

	modi
	{
		Deathmatch
		{
			verfügbare karten
			{
				Paris
			}
		}

		Allgemein
		{
			Heldenbegrenzung: Aus
			Start des Spielmodus: Manuell
		}
	}

	helden
	{
		Allgemein
		{
			Abklingzeit: 0%
			Erlittener Schaden: 500%
			Ultimeteraufladung: 250%
			Unbegrenzte Munition: Ein
			Verursachter Schaden: 500%
		}
	}
}`,
	"es-ES": `ajustes
{
	principales
	{
		Descripción: "Overwatch MIDI Pianist mode by ScroogeD. To avoid crashes, make sure to click Back To Lobby if already in game, then start game normally. Convert MIDI songs to Overwatch piano songs with this converter on GitHub: github.com/ScroogeD2/owmidiconverter"
	}

	sala
	{
		Chat de voz en partida: Permitir
		Rotación de mapas: En pausa
		Volver a sala: Nunca
	}

	modos
	{
		Combate a muerte
		{
			mapas permitidos
			{
				Paris
			}
		}

		General
		{
			Inicio del modo de juego: Manual
			Límite de héroes: Desactivado
		}
	}

	héroes
	{
		General
		{
			Carga de habilidad definitiva: 250%
			Daño infligido: 500%
			Daño recibido: 500%
			Munición infinita: Activado
			Tiempo de reutilización de la habilidad: 0%
		}
	}
}`,
	"es-MX": `configuración
{
	principal
	{
		Descripción: "Overwatch MIDI Pianist mode by ScroogeD. To avoid crashes, make sure to click Back To Lobby if already in game, then start game normally. Convert MIDI songs to Overwatch piano songs with this converter on GitHub: github.com/ScroogeD2/owmidiconverter"
	}

	sala de espera
	{
		Chat de voz de partida: Habilitado
		Ir a sala de espera: Nunca
		Rotación de mapas: En pausa
	}

	modos
	{
		Combate a muerte
		{
			mapas habilitados
			{
				París
			}
		}

		General
		{
			Iniciar modo de juego: Manual
			Límite de héroes: No
		}
	}

	héroes
	{
		General
		{
			Daño infligido: 500%
			Daño recibido: 500%
			Generación de la habilidad máxima: 250%
			Sin requisitos de munición: Activado
			Tiempo de reutilización de habilidad: 0%
		}
	}
}`,
	"fr-FR": `paramètres
{
	principal
	{
		Description: "Overwatch MIDI Pianist mode by ScroogeD. To avoid crashes, make sure to click Back To Lobby if already in game, then start game normally. Convert MIDI songs to Overwatch piano songs with this converter on GitHub: github.com/ScroogeD2/owmidiconverter"
	}

	salon
	{
		Discussion audio de partie: Activé
		Retour au salon: Jamais
		Rotation des cartes: En pause
	}

	modes
	{
		Combat à mort
		{
			cartes activées
			{
				Paris
			}
		}

		Général
		{
			Début de la partie: Manuel
			Limite de héros: Désactivé
		}
	}

	héros
	{
		Général
		{
			Dégâts infligés: 500%
			Dégâts subis: 500%
			Génération de capacité ultime: 250%
			Munitions illimitées: Activé
			Temps de recharge de la capacité: 0%
		}
	}
}`,
	"it-IT": `impostazioni
{
	principale
	{
		Descrizione: "Overwatch MIDI Pianist mode by ScroogeD. To avoid crashes, make sure to click Back To Lobby if already in game, then start game normally. Convert MIDI songs to Overwatch piano songs with this converter on GitHub: github.com/ScroogeD2/owmidiconverter"
	}

	lobby
	{
		Chat vocale della partita: Attivata
		Rotazione mappe: In pausa
		Torna alla lobby: Mai
	}

	modalità
	{
		Deathmatch
		{
			mappe abilitate
			{
				Parigi
			}
		}

		Generale
		{
			Avvio partita: Manuale
			Limite eroi: Off
		}
	}

	eroi
	{
		Generale
		{
			Danni inflitti: 500%
			Danni subiti: 500%
			Generazione Ultra: 250%
			Munizioni illimitate: On
			Tempo di recupero delle abilità: 0%
		}
	}
}`,
	"ja-JP": `設定
{
	メイン
	{
		説明: "Overwatch MIDI Pianist mode by ScroogeD. To avoid crashes, make sure to click Back To Lobby if already in game, then start game normally. Convert MIDI songs to Overwatch piano songs with this converter on GitHub: github.com/ScroogeD2/owmidiconverter"
	}

	ロビー
	{
		マッチ・ボイスチャット: 有効
		マップ・ローテーション: 停止
		ロビーに戻る: いいえ
	}

	モード
	{
		デスマッチ
		{
			有効なマップ
			{
				PARIS
			}
		}

		一般
		{
			ゲーム・モード開始: 手動
			ヒーロー制限: OFF
		}
	}

	ヒーロー
	{
		一般
		{
			アビリティのクールダウン時間: 0%
			アルティメット・チャージ: 250%
			与ダメージ: 500%
			弾数制限なし: ON
			被ダメージ: 500%
		}
	}
}`,
	"ko-KR": `settings
{
	main
	{
		설명: "Overwatch MIDI Pianist mode by ScroogeD. To avoid crashes, make sure to click Back To Lobby if already in game, then start game normally. Convert MIDI songs to Overwatch piano songs with this converter on GitHub: github.com/ScroogeD2/owmidiconverter"
	}

	lobby
	{
		경기 음성 대화: 활성화
		대기실로 돌아가기: 안 함
		전장 전환: 일시정지
	}

	modes
	{
		데스매치
		{
			enabled maps
			{
				파리
			}
		}

		일반
		{
			게임 모드 시작: 수동
			영웅 제한: 비활성화
		}
	}

	heroes
	{
		일반
		{
			궁극기 충전율: 250%
			기술 재사용 대기시간: 0%
			받는 피해: 500%
			주는 피해: 500%
			탄창 제한 없음: 활성화
		}
	}
}`,
	"pl-PL": `ustawienia
{
	główne
	{
		Opis: "Overwatch MIDI Pianist mode by ScroogeD. To avoid crashes, make sure to click Back To Lobby if already in game, then start game normally. Convert MIDI songs to Overwatch piano songs with this converter on GitHub: github.com/ScroogeD2/owmidiconverter"
	}

	poczekalnia
	{
		Czat głosowy meczu: Tryb aktywny
		Powrót do poczekalni: Nigdy
		Rotacja map: Pauza
	}

	tryby gry
	{
		Deathmatch
		{
			dostępne mapy
			{
				Paryż
			}
		}

		Ogólne
		{
			Limit bohaterów: Wył.
			Rozpoczęcie gry: Ręcznie
		}
	}

	bohaterowie
	{
		Ogólne
		{
			Brak wymogów amunicyjnych: Wł.
			Czas odnowienia zdolności: 0%
			Ładowanie Superzdolności: 250%
			Otrzymane obrażenia: 500%
			Zadane obrażenia: 500%
		}
	}
}`,
	"pt-BR": `configurações
{
	principal
	{
		Descrição: "Overwatch MIDI Pianist mode by ScroogeD. To avoid crashes, make sure to click Back To Lobby if already in game, then start game normally. Convert MIDI songs to Overwatch piano songs with this converter on GitHub: github.com/ScroogeD2/owmidiconverter"
	}

	lobby
	{
		Chat de voz da partida: Ativado
		Rotação dos mapas: Pausado
		Voltar ao lobby: Nunca
	}

	modos
	{
		Combate até a Morte
		{
			mapas ativados
			{
				Paris
			}
		}

		Geral
		{
			Iniciar modo de jogo: Manual
			Limite de heróis: Desligado
		}
	}

	heróis
	{
		Geral
		{
			Dano causado: 500%
			Dano recebido: 500%
			Geração de Supremo: 250%
			Sem requerimentos de munição: Ligado
			Tempo de recarga da habilidade: 0%
		}
	}
}`,
	"ru-RU": `settings
{
	main
	{
		Описание: "Overwatch MIDI Pianist mode by ScroogeD. To avoid crashes, make sure to click Back To Lobby if already in game, then start game normally. Convert MIDI songs to Overwatch piano songs with this converter on GitHub: github.com/ScroogeD2/owmidiconverter"
	}

	lobby
	{
		Возврат в лобби: Отключен
		Голосовой чат матча: Вкл.
		Смена полей боя: Отключена
	}

	modes
	{
		Схватка
		{
			enabled maps
			{
				Париж
			}
		}

		Общие
		{
			Лимит героев: Откл.
			Начало матча в режиме: Вручную
		}
	}

	heroes
	{
		Общие
		{
			Бесконечный боекомплект: Вкл.
			Восстановление способностей: 0%
			Зарядка суперспособностей: 250%
			Наносимый урон: 500%
			Получаемый урон: 500%
		}
	}
}`,
	"zh-CN": `设置
{
	主程序
	{
		描述: "Overwatch MIDI Pianist mode by ScroogeD. To avoid crashes, make sure to click Back To Lobby if already in game, then start game normally. Convert MIDI songs to Overwatch piano songs with this converter on GitHub: github.com/ScroogeD2/owmidiconverter"
	}

	大厅
	{
		地图轮换: 暂停轮换
		比赛语音聊天: 启用
		返回大厅: 从不
	}

	模式
	{
		死斗
		{
			启用地图
			{
				巴黎
			}
		}

		综合
		{
			比赛模式开始: 手动
			英雄限制: 关闭
		}
	}

	英雄
	{
		综合
		{
			伤害量: 500%
			受到伤害量: 500%
			技能冷却时间: 0%
			无需装弹: 开启
			终极技能充能速度: 250%
		}
	}
}`,
	"zh-TW": `設定
{
	主要
	{
		敘述: "Overwatch MIDI Pianist mode by ScroogeD. To avoid crashes, make sure to click Back To Lobby if already in game, then start game normally. Convert MIDI songs to Overwatch piano songs with this converter on GitHub: github.com/ScroogeD2/owmidiconverter"
	}

	大廳
	{
		對戰語音聊天: 啟用
		更換地圖: 暫停
		返回大廳: 從不
	}

	模式
	{
		死鬥
		{
			啟用的地圖
			{
				巴黎
			}
		}

		一般
		{
			相同英雄限制: 關閉
			開始遊戲模式: 手動
		}
	}

	英雄
	{
		一般
		{
			受到的傷害: 500%
			技能冷卻時間: 0%
			無限彈藥: 開啟
			絕招蓄力速度: 250%
			造成的傷害: 500%
		}
	}
}`
};

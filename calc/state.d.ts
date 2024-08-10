import * as I from './data/interface';
export declare namespace State {
    interface Pokemon {
        name: I.SpeciesName;
        level?: number;
        ability?: I.AbilityName;
        abilityOn?: boolean;
        isDynamaxed?: boolean;
        dynamaxLevel?: number;
        isSaltCure?: boolean;
        alliesFainted?: number;
        boostedStat?: I.StatIDExceptHP | 'auto';
        item?: I.ItemName;
        gender?: I.GenderName;
        nature?: I.NatureName;
        ivs?: Partial<I.StatsTable>;
        evs?: Partial<I.StatsTable>;
        boosts?: Partial<I.StatsTable>;
        originalCurHP?: number;
        status?: I.StatusName | '';
        teraType?: I.TypeName;
        toxicCounter?: number;
        moves?: I.MoveName[];
        overrides?: Partial<I.Specie>;
    }
    interface Move {
        name: I.MoveName;
        useZ?: boolean;
        useMax?: boolean;
        isCrit?: boolean;
        isStellarFirstUse?: boolean;
        hits?: number;
        timesUsed?: number;
        timesUsedWithMetronome?: number;
        overrides?: Partial<I.Move>;
    }
    interface Field {
        gameType: I.GameType;
        weather?: I.Weather;
        terrain?: I.Terrain;
        isMagicRoom?: boolean;
        isWonderRoom?: boolean;
        isGravity?: boolean;
        isAuraBreak?: boolean;
        isFairyAura?: boolean;
        isDarkAura?: boolean;
        isBeadsOfRuin?: boolean;
        isSwordOfRuin?: boolean;
        isTabletsOfRuin?: boolean;
        isVesselOfRuin?: boolean;
        attackerSide: Side;
        defenderSide: Side;
    }
    interface Side {
        spikes?: number;
        steelsurge?: boolean;
        vinelash?: boolean;
        wildfire?: boolean;
        cannonade?: boolean;
        volcalith?: boolean;
        isSR?: boolean;
        isReflect?: boolean;
        isLightScreen?: boolean;
        isProtected?: boolean;
        isSeeded?: boolean;
        isForesight?: boolean;
        isTailwind?: boolean;
        isHelpingHand?: boolean;
        isBadgeAtk?: boolean;
        isBadgeDef?: boolean;
        isBadgeSpeed?: boolean;
        isBadgeSpec?: boolean;
        isBadgeBoosted?: number;
        isFlowerGift?: boolean;
        isFriendGuard?: boolean;
        isAuroraVeil?: boolean;
        isBattery?: boolean;
        isPowerSpot?: boolean;
        isSwitching?: 'out' | 'in';
    }
}

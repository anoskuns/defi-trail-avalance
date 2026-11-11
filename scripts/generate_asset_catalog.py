import json
import os
from pathlib import Path
from datetime import datetime, timezone

def generate_catalog():
    asset_root = Path('asset')
    if not asset_root.exists():
        raise FileNotFoundError("Directory 'asset' does not exist.")

    # 16 Pet specifications matching Elemental Trail architecture
    PET_DEFS = {
        'fire_s1_normal': {
            'code': 101, 'name': 'Ember Sprite', 'vi_name': 'Tinh Linh Lửa',
            'element': 'fire', 'stage': 1, 'role': 'Starter Pet', 'rarity': 'Common',
            'description': 'Small flame spirit found in warm volcanic clearings. Fast energy collector.',
            'screen': ['/hunt', '/vault', '/nest', '/evolve']
        },
        'fire_s2_normal': {
            'code': 102, 'name': 'Flare Fox', 'vi_name': 'Hồ Ly Lửa',
            'element': 'fire', 'stage': 2, 'role': 'Target Evolution (Demo MVP)', 'rarity': 'Rare',
            'description': 'Evolved fox spirit with blazing tails. Target outcome of 2 Ember Sprite + 8 Essence recipe.',
            'screen': ['/vault', '/nest', '/evolve', '/reward']
        },
        'fire_s3_normal': {
            'code': 103, 'name': 'Pyromane Lion', 'vi_name': 'Sư Tử Hỏa Diệm',
            'element': 'fire', 'stage': 3, 'role': 'Final Evolution', 'rarity': 'Epic',
            'description': 'Majestic fire lion with blazing mane. Apex fire predator.',
            'screen': ['/vault', '/nest']
        },
        'water_s1_normal': {
            'code': 201, 'name': 'Aqua Drop', 'vi_name': 'Giọt Nước Tinh Nghịch',
            'element': 'water', 'stage': 1, 'role': 'Starter Pet', 'rarity': 'Common',
            'description': 'Playful water spirit hovering over natural springs and streams.',
            'screen': ['/hunt', '/vault', '/nest', '/evolve']
        },
        'water_s2_normal': {
            'code': 202, 'name': 'Crested Shark', 'vi_name': 'Cá Mập Triều Dâng',
            'element': 'water', 'stage': 2, 'role': 'Evolution', 'rarity': 'Rare',
            'description': 'Streamlined aqua predator adept at tidal navigation.',
            'screen': ['/vault', '/nest', '/evolve']
        },
        'water_s3_normal': {
            'code': 203, 'name': 'Tidal Serpent', 'vi_name': 'Giao Long Hải Lưu',
            'element': 'water', 'stage': 3, 'role': 'Final Evolution', 'rarity': 'Epic',
            'description': 'Legendary sea serpent commanding tidal waves.',
            'screen': ['/vault', '/nest']
        },
        'earth_s1_normal': {
            'code': 301, 'name': 'Mossy Pebble', 'vi_name': 'Hòn Đá Rêu Phong',
            'element': 'earth', 'stage': 1, 'role': 'Starter Pet', 'rarity': 'Common',
            'description': 'Ancient stone creature covered in resilient moss.',
            'screen': ['/hunt', '/vault', '/nest', '/evolve']
        },
        'earth_s2_normal': {
            'code': 302, 'name': 'Boulder Boar', 'vi_name': 'Heo Rừng Nham Thạch',
            'element': 'earth', 'stage': 2, 'role': 'Evolution', 'rarity': 'Rare',
            'description': 'Sturdy boar encased in impenetrable rock armor.',
            'screen': ['/vault', '/nest', '/evolve']
        },
        'earth_s3_normal': {
            'code': 303, 'name': 'Quartz Gorilla', 'vi_name': 'Vượn Đột Biến Thạch Anh',
            'element': 'earth', 'stage': 3, 'role': 'Final Evolution', 'rarity': 'Epic',
            'description': 'Colossal quartz guardian endowed with crystal fury.',
            'screen': ['/vault', '/nest']
        },
        'wind_s1_normal': {
            'code': 401, 'name': 'Zephyr Cloud', 'vi_name': 'Đám Mây Tinh Linh',
            'element': 'wind', 'stage': 1, 'role': 'Starter Pet', 'rarity': 'Common',
            'description': 'Breezy cloud entity drifting across highland meadows.',
            'screen': ['/hunt', '/vault', '/nest', '/evolve']
        },
        'wind_s2_normal': {
            'code': 402, 'name': 'Gale Hawk', 'vi_name': 'Ưng Bão Tố',
            'element': 'wind', 'stage': 2, 'role': 'Evolution', 'rarity': 'Rare',
            'description': 'Keen-eyed raptor slicing through turbulent gale winds.',
            'screen': ['/vault', '/nest', '/evolve']
        },
        'wind_s3_normal': {
            'code': 403, 'name': 'Storm Griffin', 'vi_name': 'Điểu Sư Cuồng Phong',
            'element': 'wind', 'stage': 3, 'role': 'Final Evolution', 'rarity': 'Epic',
            'description': 'Noble aerial predator wielding storm lightning and whirlwind.',
            'screen': ['/vault', '/nest']
        },
        'ice_s1_normal': {
            'code': 501, 'name': 'Avalanche Pet', 'vi_name': 'Linh Thú Avalanche',
            'element': 'ice', 'stage': 1, 'role': 'Event GPS Exclusive (Avalanche Summit / Hackathon)', 'rarity': 'Rare',
            'description': 'Linh thú biểu tượng của sự kiện Avalanche Build Web3, kết tinh từ đỉnh tuyết sơn băng giá Avalanche.',
            'screen': ['/hunt', '/vault', '/nest']
        },
        'magma_s1_normal': {
            'code': 601, 'name': 'Emberstone', 'vi_name': 'Nham Thạch Nung Đỏ',
            'element': 'magma', 'stage': 1, 'role': 'Upcoming Season 2 Expansion', 'rarity': 'Rare',
            'description': 'Lõi nham thạch nóng chảy, dự kiến xuất hiện trong bản đồ viễn chinh Mùa 2.',
            'screen': ['/hunt', '/vault', '/nest']
        },
        'lightning_s1_normal': {
            'code': 701, 'name': 'KHTN Pet', 'vi_name': 'Linh Thú KHTN',
            'element': 'lightning', 'stage': 1, 'role': 'Event GPS Exclusive (ĐH Khoa Học Tự Nhiên)', 'rarity': 'Rare',
            'description': 'Linh thú công nghệ tia chớp đại diện cho đối tác Đại học Khoa học Tự nhiên (HCMUS).',
            'screen': ['/hunt', '/vault', '/nest']
        },
        'nature_s1_normal': {
            'code': 801, 'name': 'Greenwich Pet', 'vi_name': 'Linh Thú Greenwich',
            'element': 'nature', 'stage': 1, 'role': 'Event GPS Exclusive (ĐH Greenwich Việt Nam)', 'rarity': 'Rare',
            'description': 'Linh thú chồi xanh sinh thái đại diện cho đối tác Đại học Greenwich Việt Nam.',
            'screen': ['/hunt', '/vault', '/nest']
        },
    }

    catalog = {
        'meta': {
            'project': 'Elemental Trail',
            'version': '1.0.0',
            'generatedAt': datetime.now(timezone.utc).isoformat(),
            'description': 'Machine-readable and AI-friendly Master Asset Catalog mapping physical repository assets to gameplay models, elements, UI screens, and runtime paths.',
            'sourceDirectory': 'asset',
            'runtimeMountPath': '/assets',
            'totalAssetFiles': len(list(asset_root.rglob('*.*')))
        },
        'groups': {},
        'indexes': {
            'bySpeciesCode': {},
            'byElement': {},
            'byScreen': {
                '/hunt': [],
                '/vault': [],
                '/nest': [],
                '/evolve': [],
                '/reward': [],
                '/landing': []
            },
            'integrationStatus': {
                'core_production_ready': [],
                'event_gps_exclusive': [],
                'ui_vector_lightweight': [],
                'ambient_backgrounds': [],
                'event_materials': [],
                'reference_and_dev_only': []
            }
        }
    }

    # 1. Art / Pets
    pets_list = []
    for p in sorted(asset_root.glob('art/*.png')):
        stem = p.stem
        meta = PET_DEFS.get(stem, {})
        code = meta.get('code', 999)
        item_id = f"pet_{code}_{stem}"
        status = 'event_gps_exclusive' if 'Event' in meta.get('role', '') else 'core_production_ready'
        item = {
            'id': item_id,
            'speciesCode': code,
            'assetKey': stem,
            'name': meta.get('name', stem),
            'nameVi': meta.get('vi_name', stem),
            'element': meta.get('element', 'neutral'),
            'stage': meta.get('stage', 1),
            'rarity': meta.get('rarity', 'Common'),
            'role': meta.get('role', 'Pet Species'),
            'description': meta.get('description', ''),
            'filePath': f'asset/art/{p.name}',
            'runtimePath': f'/assets/art/{p.name}',
            'fileSize': p.stat().st_size,
            'format': 'png',
            'dimensions': '1254x1254',
            'hasAlpha': True,
            'status': status,
            'targetScreens': meta.get('screen', ['/vault'])
        }
        pets_list.append(item)
        catalog['indexes']['bySpeciesCode'][str(code)] = item
        el = meta.get('element')
        if el:
            catalog['indexes']['byElement'].setdefault(el, []).append(item_id)
        for sc in meta.get('screen', []):
            catalog['indexes']['byScreen'].setdefault(sc, []).append(item_id)
        catalog['indexes']['integrationStatus'][status].append(item_id)

    catalog['groups']['pets'] = pets_list

    # 2. Frames & Fallback
    frames_list = []
    frame_specs = {
        'common frames.png': {
            'id': 'frame_common', 'name': 'Common Frame', 'nameVi': 'Khung Thẻ Thường',
            'purpose': 'Base / Stage 1 Pets card border', 'screen': ['/vault', '/hunt']
        },
        'rare frames.png': {
            'id': 'frame_rare', 'name': 'Rare Frame', 'nameVi': 'Khung Thẻ Hiếm (Viền Vàng)',
            'purpose': 'Evolved / Event Pets card border', 'screen': ['/vault', '/evolve', '/reward']
        },
        'card-back.png': {
            'id': 'card_back_fallback', 'name': 'Card Back Fallback', 'nameVi': 'Mặt Sau Thẻ Bài',
            'purpose': 'Locked / Silhouette / Loading card state', 'screen': ['/hunt', '/vault']
        }
    }
    for fp in [asset_root / 'frame/common frames.png', asset_root / 'frame/rare frames.png', asset_root / 'fallback/card-back.png']:
        if fp.exists():
            spec = frame_specs.get(fp.name, {})
            rel = fp.relative_to(asset_root).as_posix()
            item = {
                'id': spec.get('id', fp.stem),
                'name': spec.get('name', fp.stem),
                'nameVi': spec.get('nameVi', fp.stem),
                'filePath': f'asset/{rel}',
                'runtimePath': f'/assets/{rel}',
                'fileSize': fp.stat().st_size,
                'format': 'png',
                'dimensions': '1024x1536',
                'purpose': spec.get('purpose'),
                'status': 'core_production_ready',
                'targetScreens': spec.get('screen', ['/vault'])
            }
            frames_list.append(item)
            catalog['indexes']['integrationStatus']['core_production_ready'].append(item['id'])
            for sc in spec.get('screen', []):
                catalog['indexes']['byScreen'].setdefault(sc, []).append(item['id'])
    catalog['groups']['frames'] = frames_list

    # 3. UI Gameplay Icons
    ui_list = []
    ui_specs = {
        'cage.png': {'id': 'ui_cage', 'name': 'Custody / Sanctuary Cage', 'nameVi': 'Biểu Tượng Gửi Nuôi', 'screen': ['/nest', '/vault']},
        'craft.png': {'id': 'ui_craft_altar', 'name': 'Evolution Crafting Altar', 'nameVi': 'Bàn Thờ Tiến Hóa', 'screen': ['/evolve']},
        'essence.png': {'id': 'ui_essence_vial', 'name': 'Elemental Essence Vial', 'nameVi': 'Bình Tinh Chất', 'screen': ['/nest', '/evolve', '/hunt']},
        'voucher.png': {'id': 'ui_voucher_entitlement', 'name': 'ICM Voucher Entitlement', 'nameVi': 'Chứng Chỉ Phần Thưởng ICM', 'screen': ['/reward']}
    }
    for up in sorted(asset_root.glob('ui/*.png')):
        spec = ui_specs.get(up.name, {})
        item = {
            'id': spec.get('id', up.stem),
            'name': spec.get('name', up.stem),
            'nameVi': spec.get('nameVi', up.stem),
            'filePath': f'asset/ui/{up.name}',
            'runtimePath': f'/assets/ui/{up.name}',
            'fileSize': up.stat().st_size,
            'format': 'png',
            'status': 'core_production_ready',
            'targetScreens': spec.get('screen', [])
        }
        ui_list.append(item)
        catalog['indexes']['integrationStatus']['core_production_ready'].append(item['id'])
        for sc in spec.get('screen', []):
            catalog['indexes']['byScreen'].setdefault(sc, []).append(item['id'])
    catalog['groups']['ui_gameplay'] = ui_list

    # 4. Landing Hero
    hero_path = asset_root / 'landing/hero.png'
    if hero_path.exists():
        hero_item = {
            'id': 'landing_hero_banner',
            'name': 'Landing Page Hero Banner',
            'nameVi': 'Banner Trang Chủ',
            'filePath': 'asset/landing/hero.png',
            'runtimePath': '/assets/landing/hero.png',
            'fileSize': hero_path.stat().st_size,
            'format': 'png',
            'dimensions': '1672x941',
            'status': 'core_production_ready',
            'targetScreens': ['/landing']
        }
        catalog['groups']['landing'] = [hero_item]
        catalog['indexes']['integrationStatus']['core_production_ready'].append('landing_hero_banner')
        catalog['indexes']['byScreen']['/landing'].append('landing_hero_banner')

    # 5. 3D Elemental Emblems
    emblems_3d = []
    for ep in sorted(asset_root.glob('icons-raster-reference/*.png')):
        el = ep.stem
        item = {
            'id': f'emblem_3d_{el}',
            'element': el,
            'name': f'{el.capitalize()} 3D Emblem',
            'nameVi': f'Huy Hiệu 3D Hệ {el.capitalize()}',
            'filePath': f'asset/icons-raster-reference/{ep.name}',
            'runtimePath': f'/assets/icons-raster-reference/{ep.name}',
            'fileSize': ep.stat().st_size,
            'format': 'png',
            'status': 'core_production_ready',
            'targetScreens': ['/hunt', '/vault', '/evolve']
        }
        emblems_3d.append(item)
        catalog['indexes']['byElement'].setdefault(el, []).append(item['id'])
        catalog['indexes']['integrationStatus']['core_production_ready'].append(item['id'])
    catalog['groups']['elemental_emblems_3d'] = emblems_3d

    # 6. SVG Vector Types (Flat & Badge)
    svg_flat = []
    for sp in sorted(asset_root.glob('svg/types/*.svg')):
        item = {
            'id': f'svg_type_{sp.stem}',
            'element': sp.stem,
            'name': f'Vector Flat Type: {sp.stem}',
            'filePath': f'asset/svg/types/{sp.name}',
            'runtimePath': f'/assets/svg/types/{sp.name}',
            'fileSize': sp.stat().st_size,
            'format': 'svg',
            'status': 'ui_vector_lightweight',
            'targetScreens': ['/hunt', '/vault', '/nest', '/evolve']
        }
        svg_flat.append(item)
        catalog['indexes']['integrationStatus']['ui_vector_lightweight'].append(item['id'])
    catalog['groups']['svg_types_flat'] = svg_flat

    svg_badge = []
    for sp in sorted(asset_root.glob('svg/types/badge/*.svg')):
        item = {
            'id': f'svg_badge_{sp.stem}',
            'element': sp.stem,
            'name': f'Vector Badge Type: {sp.stem}',
            'filePath': f'asset/svg/types/badge/{sp.name}',
            'runtimePath': f'/assets/svg/types/badge/{sp.name}',
            'fileSize': sp.stat().st_size,
            'format': 'svg',
            'status': 'ui_vector_lightweight',
            'targetScreens': ['/hunt', '/vault', '/nest', '/evolve']
        }
        svg_badge.append(item)
        catalog['indexes']['integrationStatus']['ui_vector_lightweight'].append(item['id'])
    catalog['groups']['svg_types_badge'] = svg_badge

    # 7. Navigation & Controls SVG
    nav_svgs = []
    for sp in sorted(asset_root.glob('svg/*.svg')):
        status = 'ui_vector_lightweight' if ('button' in sp.stem or 'gender' in sp.stem) else 'reference_and_dev_only'
        item = {
            'id': f'nav_{sp.stem}',
            'name': sp.stem.replace('-', ' ').title(),
            'filePath': f'asset/svg/{sp.name}',
            'runtimePath': f'/assets/svg/{sp.name}',
            'fileSize': sp.stat().st_size,
            'format': 'svg',
            'status': status,
            'targetScreens': ['/hunt', '/vault']
        }
        nav_svgs.append(item)
        catalog['indexes']['integrationStatus'][status].append(item['id'])
    catalog['groups']['svg_controls'] = nav_svgs

    # 8. Backgrounds
    bg_list = []
    for bp in sorted(asset_root.glob('Background_*.jpg')):
        item = {
            'id': f'bg_{bp.stem.lower()}',
            'name': bp.stem.replace('_', ' '),
            'nameVi': 'Phông Nền Phong Cảnh Thám Hiểm',
            'filePath': f'asset/{bp.name}',
            'runtimePath': f'/assets/{bp.name}',
            'fileSize': bp.stat().st_size,
            'format': 'jpg',
            'status': 'ambient_backgrounds',
            'recommendedUsage': 'Atmospheric backdrop for /hunt (Waypoint Trail) and /nest (Sanctuary View)',
            'targetScreens': ['/hunt', '/nest']
        }
        bg_list.append(item)
        catalog['indexes']['integrationStatus']['ambient_backgrounds'].append(item['id'])
        for sc in item['targetScreens']:
            catalog['indexes']['byScreen'][sc].append(item['id'])
    catalog['groups']['backgrounds'] = bg_list

    # 9. Rarity & Star System
    rarity_list = []
    for rp in sorted(asset_root.glob('Icon_*_Stars.png')):
        stars = rp.stem.split('_')[1]
        item = {
            'id': f'star_rating_{stars}',
            'stars': int(stars),
            'name': f'{stars} Star Rating Badge',
            'filePath': f'asset/{rp.name}',
            'runtimePath': f'/assets/{rp.name}',
            'fileSize': rp.stat().st_size,
            'format': 'png',
            'status': 'core_production_ready',
            'targetScreens': ['/vault', '/evolve']
        }
        rarity_list.append(item)
        catalog['indexes']['integrationStatus']['core_production_ready'].append(item['id'])

    for rp in sorted(asset_root.glob('Rarity_*_background.png')):
        tier = rp.stem.split('_')[1]
        item = {
            'id': f'rarity_bg_{tier}',
            'tier': tier,
            'name': f'Rarity {tier.upper()} Gradient Card Background',
            'filePath': f'asset/{rp.name}',
            'runtimePath': f'/assets/{rp.name}',
            'fileSize': rp.stat().st_size,
            'format': 'png',
            'status': 'core_production_ready',
            'targetScreens': ['/vault', '/evolve']
        }
        rarity_list.append(item)
        catalog['indexes']['integrationStatus']['core_production_ready'].append(item['id'])
    catalog['groups']['rarity_system'] = rarity_list

    # 10. Event Loot & Materials
    loot_list = []
    loot_items = sorted(asset_root.glob('Item_*.png'))
    for lp in loot_items:
        clean_name = lp.stem.replace('Item_', '').replace('_', ' ')
        item = {
            'id': f'material_{lp.stem.lower()}',
            'name': clean_name,
            'nameVi': f'Nguyên Liệu / Tinh Thạch {clean_name}',
            'filePath': f'asset/{lp.name}',
            'runtimePath': f'/assets/{lp.name}',
            'fileSize': lp.stat().st_size,
            'format': 'png',
            'status': 'event_materials',
            'recommendedUsage': 'Rare drop from Event GPS Hunt checkpoints or advanced evolution recipe materials',
            'targetScreens': ['/hunt', '/vault', '/evolve']
        }
        loot_list.append(item)
        catalog['indexes']['integrationStatus']['event_materials'].append(item['id'])
        for sc in item['targetScreens']:
            catalog['indexes']['byScreen'][sc].append(item['id'])
    catalog['groups']['event_materials'] = loot_list

    # 11. Artifacts & Tomes (Weapons folder files)
    tomes_list = []
    for wp in sorted(asset_root.glob('Weapon_*.png')):
        clean_name = wp.stem.replace('Weapon_', '').replace('_', ' ')
        item = {
            'id': f'artifact_{wp.stem.lower()}',
            'name': clean_name,
            'nameVi': f'Pháp Khí / Sổ Tay {clean_name}',
            'filePath': f'asset/{wp.name}',
            'runtimePath': f'/assets/{wp.name}',
            'fileSize': wp.stat().st_size,
            'format': 'png',
            'status': 'reference_and_dev_only',
            'recommendedUsage': 'Field Guide artifacts / Explorer Tomes in Bestiary (rebrand before commercial publish)',
            'targetScreens': ['/vault']
        }
        tomes_list.append(item)
        catalog['indexes']['integrationStatus']['reference_and_dev_only'].append(item['id'])
    catalog['groups']['explorer_tomes'] = tomes_list

    # 12. Symbols & Chips (Summary in catalog to keep JSON compact yet exhaustive)
    symbols_list = []
    for sp in sorted(asset_root.glob('symbols/*.png')):
        category = 'ui_chip'
        if '32px' in sp.name:
            category = 'type_chip_32px'
        elif 'badge' in sp.name:
            category = 'type_badge_png'
        elif 'move' in sp.name:
            category = 'move_type_icon'
        elif 'ui' in sp.name:
            category = 'ui_control_icon'
        else:
            category = 'misc_symbol'

        symbols_list.append({
            'id': f'symbol_{sp.stem}',
            'name': sp.stem,
            'category': category,
            'filePath': f'asset/symbols/{sp.name}',
            'runtimePath': f'/assets/symbols/{sp.name}',
            'fileSize': sp.stat().st_size
        })
    catalog['groups']['symbols_and_chips'] = {
        'count': len(symbols_list),
        'description': '131 compact raster chips, badges, and move indicators for UI data density and quick status tags.',
        'items': symbols_list
    }

    # Summary Counts in meta
    catalog['meta']['summaryByCategory'] = {k: (v['count'] if isinstance(v, dict) and 'count' in v else len(v)) for k, v in catalog['groups'].items()}
    catalog['meta']['summaryByStatus'] = {k: len(v) for k, v in catalog['indexes']['integrationStatus'].items()}

    # Output file paths
    out_asset_json = Path('asset/asset_catalog.json')
    out_shared_json = Path('packages/shared/src/constants/assetCatalog.json')

    out_asset_json.write_text(json.dumps(catalog, indent=2, ensure_ascii=False), encoding='utf-8')
    print(f"Generated: {out_asset_json} ({out_asset_json.stat().st_size} bytes)")

    out_shared_json.parent.mkdir(parents=True, exist_ok=True)
    out_shared_json.write_text(json.dumps(catalog, indent=2, ensure_ascii=False), encoding='utf-8')
    print(f"Synced to shared package: {out_shared_json} ({out_shared_json.stat().st_size} bytes)")

if __name__ == '__main__':
    generate_catalog()

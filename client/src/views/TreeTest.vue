<template>
  <div>
    <tree :tree-data="build"></tree>
  </div>
</template>

<script>
import Tree from '@/components/Tree';

export default {
  data: () => ({
    build: {
      _id: '574d967124597745970e7c94',
      name: 'Simonov Semi-Automatic Carbine SKS 7.62x39',
      shortName: 'SKS',
      description: "Soviet semi-automatic carbine designed by Sergei Simonov for 7.62x39 cartridge and known abroad as SKS-45. Immensely popular both in CIS countries and in the West, this weapon is still in active service in some countries in form of various copies and modifications. This particular specimen comes from extended storage warehouses of Tula Arms Plant and haven't yet undergo the civilian weapon normalization procedure.",
      price: 19331,
      weight: 2.627,
      maxStack: 1,
      rarity: 'rare',
      grid: {
        color: {
          r: 0,
          g: 0,
          b: 0,
          a: 1,
        },
        height: 1,
        width: 4,
      },
      _modified: 1571536468,
      _kind: 'firearm',
      type: 'primary',
      class: 'assaultCarbine',
      caliber: '7.62x39mm',
      rof: 40,
      action: 'gas',
      modes: [
        'single',
      ],
      velocity: 0,
      effectiveDist: 400,
      ergonomics: 40,
      foldRectractable: false,
      recoilVertical: 182,
      recoilHorizontal: 400,
      slots: {
        magazine: {
          filter: {
            magazine: [
              '5c90c3622e221601da359851',
              '5c90c3622e221601da359851',
              '5c90c3622e221601da359851',
            ],
          },
          required: false,
        },
        muzzle: {
          filter: {
            modificationMuzzle: [
              '5c90c3622e221601da359851',
            ],
          },
          required: false,
        },
        sightRear: {
          filter: {
            modificationSight: [
              '5c90c3622e221601da359851',
            ],
          },
          required: false,
        },
        stock: {
          filter: {
            modificationStock: [
              '5c90c3622e221601da359851',
              '5c90c3622e221601da359851',
              '5c90c3622e221601da359851',
            ],
          },
          required: true,
        },
      },
    },
    buildTest: {
      weapon: 'SR-25',
      horizontal_recoil: 122,
      vertical_recoil: 50,
      ergonomics: 62,
      slots: [{
        slot: 'Charge',
        compatibleAttachments: [{
          name: 'Ambi SR-25',
          ergonomics: 1,
          image: 'https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/e/ee/KAC_Ambidextrous_Charging_Handle_for_AR-10_icon.png?version=ef290fe68aca1e081f9f57ea641a5214',
        }],
      },
      {
        slot: 'Pistol Grip',
        compatibleAttachments: [{
          name: 'Colt A2 AR-15 pistol grip',
          ergonomics: 5,
          image: 'https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/7/7e/A2m4standard.png?version=5469f79c3bb903f063f02b3fe27e2d34',
        }],
      },
      {
        slot: 'Receiver',
        compatibleAttachments: [{
          name: 'SR-25 Upper',
          ergonomics: 5,
          image: 'https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/0/0e/Upper_receiver_KAC_7.62x51_for_SR-25_rifle_icon.png?version=f852255212d6f3be7ebc57e880731309',
        }],
      },
      ],
    },
  }),
  components: {
    Tree,
  },
};

</script>

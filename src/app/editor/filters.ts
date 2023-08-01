import * as photon from '@silvia-odwyer/photon'

import { IImage } from 'src/lib/interfaces'

export type Filters =
  | 'hsv'
  | 'noise_reduction'
  | 'alter_channel'
  | 'invert'
  | 'selective_color_convert'
  | 'selective_greyscale'
  | 'gaussian_blur'

export type customerFilter =
  | 'oceanic'
  | 'islands'
  | 'marine'
  | 'seagreen'
  | 'flagblue'
  | 'diamante'
  | 'liquid'
  | 'radio'
  | 'twenties'
  | 'rosetint'
  | 'mauve'
  | 'bluechrome'
  | 'vintage'
  | 'perfume'
  | 'serenity'
  | 'golden'
  | 'pastelPink'
  | 'cali'
  | 'dramatic'
  | 'firenze'
  | 'obsidian'
  | 'lofi'
  | 'sharpen'
  | 'identity'
  | 'boxBlur'
  | 'laplace'
  | 'edgeOne'
  | 'emboss'
  | 'sobelHorizontal'
  | 'sobelVertical'
  | 'prewittHorizontal'

export const CUSTOMER_FILTERS: customerFilter[] = [
  'oceanic',
  'islands',
  'marine',
  'seagreen',
  'flagblue',
  'diamante',
  'liquid',
  'radio',
  'twenties',
  'rosetint',
  'mauve',
  'bluechrome',
  'vintage',
  'perfume',
  'serenity',
  'golden',
  'pastelPink',
  'cali',
  'dramatic',
  'firenze',
  'obsidian',
  'lofi',
  'sharpen',
  'identity',
  'boxBlur',
  'laplace',
  'edgeOne',
  'emboss',
  'sobelHorizontal',
  'sobelVertical',
  'prewittHorizontal',
]

export type hsvMode = 'saturate' | 'desaturate' | 'shift_hue' | 'darken' | 'lighten'
export enum AlterChannel {
  red = 0,
  green = 1,
  blue = 2,
}

export interface IFilterOrder {
  filters: Filters[]
  adjustment: customerFilter[]
  effects: customerFilter[]
}

export const FILTERS_ORDER: IFilterOrder = {
  filters: [
    'noise_reduction',
    'alter_channel',
    'hsv',
    'invert',
    'selective_color_convert',
    'selective_greyscale',
    'gaussian_blur',
  ],
  adjustment: CUSTOMER_FILTERS,
  effects: [],
}

const hsv = (img: photon.PhotonImage, mode: hsvMode, intensity: number) =>
  photon.hsv(img, mode, intensity)

const noiseReduction = (img: photon.PhotonImage) => photon.noise_reduction(img)

const alterChannel = (img: photon.PhotonImage, channel: AlterChannel, intensity: number) =>
  photon.alter_channel(img, channel, intensity)

const invert = (img: photon.PhotonImage) => photon.invert(img)

const selectiveColorConvert = (
  img: photon.PhotonImage,
  oldColor: photon.Rgb,
  newColor: photon.Rgb,
  fraction: number,
) => photon.selective_color_convert(img, oldColor, newColor, fraction)

const selectiveGreyscale = (img: photon.PhotonImage, color: photon.Rgb) =>
  photon.selective_greyscale(img, color)

const gaussianBlur = (img: photon.PhotonImage, radius: number) => photon.gaussian_blur(img, radius)

const AvailableCustomFilters = (img: photon.PhotonImage, filter) => {
  const filters: { [K in customerFilter]: (...args) => void } =
  {
    oceanic: (img: photon.PhotonImage) => photon.filter(img, 'oceanic'),
    islands: (img: photon.PhotonImage) => photon.filter(img, 'islands'),
    marine: (img: photon.PhotonImage) => photon.filter(img, 'marine'),
    seagreen: (img: photon.PhotonImage) => photon.filter(img, 'seagreen'),
    flagblue: (img: photon.PhotonImage) => photon.filter(img, 'flagblue'),
    diamante: (img: photon.PhotonImage) => photon.filter(img, 'diamante'),
    liquid: (img: photon.PhotonImage) => photon.filter(img, 'liquid'),
    radio: (img: photon.PhotonImage) => photon.filter(img, 'radio'),
    twenties: (img: photon.PhotonImage) => photon.filter(img, 'twenties'),
    rosetint: (img: photon.PhotonImage) => photon.filter(img, 'rosetint'),
    mauve: (img: photon.PhotonImage) => photon.filter(img, 'mauve'),
    bluechrome: (img: photon.PhotonImage) => photon.filter(img, 'bluechrome'),
    vintage: (img: photon.PhotonImage) => photon.filter(img, 'vintage'),
    perfume: (img: photon.PhotonImage) => photon.filter(img, 'perfume'),
    serenity: (img: photon.PhotonImage) => photon.filter(img, 'serenity'),
    golden: (img: photon.PhotonImage) => photon.filter(img, 'golden'),
    pastelPink: (img: photon.PhotonImage) => photon.filter(img, 'pastel_pink'),
    cali: (img: photon.PhotonImage) => photon.filter(img, 'cali'),
    dramatic: (img: photon.PhotonImage) => photon.filter(img, 'dramatic'),
    firenze: (img: photon.PhotonImage) => photon.filter(img, 'firenze'),
    obsidian: (img: photon.PhotonImage) => photon.filter(img, 'obsidian'),
    lofi: (img: photon.PhotonImage) => photon.filter(img, 'lofi'),

    sharpen: (img: photon.PhotonImage) => photon.sharpen(img),
    identity: (img: photon.PhotonImage) => photon.identity(img),
    boxBlur: (img: photon.PhotonImage) => photon.box_blur(img),
    laplace: (img: photon.PhotonImage) => photon.laplace(img),
    edgeOne: (img: photon.PhotonImage) => photon.edge_one(img),
    emboss: (img: photon.PhotonImage) => photon.emboss(img),
    sobelHorizontal: (img: photon.PhotonImage) => photon.sobel_horizontal(img),
    sobelVertical: (img: photon.PhotonImage) => photon.sobel_vertical(img),
    prewittHorizontal: (img: photon.PhotonImage) => photon.prewitt_horizontal(img),
  }

  return filters[filter](img)
}

const applyFilter = (image: IImage, filter: Filters | customerFilter, params: null) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = image.width
  canvas.height = image.height
  const img = new Image()
  img.src = image.image

  // Draw the image element onto the canvas
  ctx.drawImage(img, 0, 0)

  // Convert the ImageData found in the canvas to a PhotonImage (so that it can communicate with the core Rust library)
  const imagePhoton = photon.open_image(canvas, ctx)

  // Filter the image, the PhotonImage's raw pixels are modified

  if (filter === 'noise_reduction') {
    noiseReduction(imagePhoton)
  } else if (filter === 'alter_channel') {
    alterChannel(imagePhoton, AlterChannel.red, 0.9)
  } else if (filter === 'hsv') {
    hsv(imagePhoton, 'saturate', 0.3)
  } else if (filter === 'invert') {
    invert(imagePhoton)
  } else if (filter === 'selective_color_convert') {
    selectiveColorConvert(imagePhoton, new photon.Rgb(100, 20, 6), new photon.Rgb(255, 255, 255), 0.5)
  } else if (filter === 'selective_greyscale') {
    selectiveGreyscale(imagePhoton, new photon.Rgb(0, 0, 0))
  } else if (filter === 'gaussian_blur') {
    gaussianBlur(imagePhoton, 1)
  } else {
    AvailableCustomFilters(imagePhoton, filter)
  }

  // Place the modified image back on the canvas
  photon.putImageData(canvas, ctx, imagePhoton)

  return canvas.toDataURL('image/png', 1.0)
}

export {
  applyFilter,
  AvailableCustomFilters,
  noiseReduction,
  alterChannel,
  hsv,
  invert,
  selectiveColorConvert,
  selectiveGreyscale,
  gaussianBlur,
}

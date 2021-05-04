import { IconButton } from '@chakra-ui/button';
import { DownloadIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/layout';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { arrayBufferToBlob, IndexedDb } from '../lib/db';
import fileManager, { ArrayBuffObject, getUrlFromBlob } from '../lib/files';
import { useOnlineStatus } from '../lib/hooks/useOnlineStatus';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState(
    'https://midicircuit-dev.fra1.digitaloceanspaces.com/website-assets/MIDI_V2.6.mov'
  );

  const poster =
    'https://midicircuit-dev.fra1.digitaloceanspaces.com/website-assets/midicircuit_promo_poster.png';

  const isOnline = useOnlineStatus();

  const storeVideoOffline = async () => {
    const db = new IndexedDb('pwa-offline-videos');
    await db.createObjectStore(['videos']);
    const videoBuffer = await fileManager.downloadFileAsArrayBuffer(videoUrl);
    db.set('videos', videoUrl, {
      key: videoUrl,
      data: videoBuffer.data,
      type: videoBuffer.type,
    });
  };

  useEffect(() => {
    const fetchLocalVideo = async () => {
      const db = new IndexedDb('pwa-offline-videos');
      await db.openDb();
      const result = (await db.getValueByKey(
        'videos',
        videoUrl
      )) as ArrayBuffObject;

      const blob = arrayBufferToBlob(result.data, result.type);
      const url = getUrlFromBlob(blob);

      setVideoUrl(url);
    };

    console.log(isOnline);
    if (!isOnline) {
      fetchLocalVideo();
    }
  }, [isOnline]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/manifest.json' />
      </Head>

      <main className={styles.main}>
        <Flex direction='column'>
          <video src={videoUrl} poster={poster} controls />
          <IconButton
            icon={<DownloadIcon />}
            aria-label='download video'
            onClick={storeVideoOffline}
            label='Save'
          />
        </Flex>
      </main>
    </div>
  );
}

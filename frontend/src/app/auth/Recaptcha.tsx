import type { FC, ForwardedRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import styles from './captcha.module.scss'

type Props = { forwardRef: ForwardedRef<ReCAPTCHA> }
export const Recaptcha: FC<Props> = ({ forwardRef }) => {
	return (
		<ReCAPTCHA
			ref={forwardRef}
			size='normal'
			sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
			theme='light'
			className={styles.recaptcha}
		/>
	)
}

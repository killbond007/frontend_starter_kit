import { AnimatePresence, motion } from 'framer-motion'
import PropTypes from 'prop-types'
import React from 'react'

const Page = ({ id, children, ...props }) => {
	return (
		<AnimatePresence>
			<motion.section
				data-testid={`__${id}-page__`}
				key={id}
				{...props}
				initial={{ y: 300, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: -300, opacity: 0 }}
				transition={{ ease: 'anticipate', duration: 0.5 }}
			>
				{children}
			</motion.section>
		</AnimatePresence>
	)
}

Page.propTypes = {
	/** Id of the page. */
	id: PropTypes.string,
	/** The content of the page. */
	children: PropTypes.node,
}

Page.defaultProps = {
	id: null,
	children: null,
}

export default Page

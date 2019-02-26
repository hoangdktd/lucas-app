import frenchMessages from 'ra-language-french';

export default {
    ...frenchMessages,
    pos: {
        search: 'Rechercher',
        configuration: 'Configuration',
        language: 'Langue',
        theme: {
            name: 'Theme',
            light: 'Clair',
            dark: 'Obscur',
        },
        dashboard: {
            monthly_revenue: 'CA à 30 jours',
            new_orders: 'Nouvelles commandes',
            pending_reviews: 'Commentaires à modérer',
            new_customers: 'Nouveaux clients',
            pending_orders: 'Commandes à traiter',
            order: {
                items:
                    'par %{customer_name}, un poster |||| par %{customer_name}, %{nb_items} posters',
            },
            welcome: {
                title: 'Bienvenue sur la démo de react-admin',
                subtitle:
                    "Ceci est le back-office d'un magasin de posters imaginaire. N'hésitez pas à explorer et à modifier les données. La démo s'exécute en local dans votre navigateur, et se remet à zéro chaque fois que vous rechargez la page.",
                aor_button: 'Site web de react-admin',
                demo_button: 'Code source de cette démo',
            },
        },
        order: {
            add_product: 'Add Product',
            product_name: 'Product Name',
            link: 'Link',
            price: 'Price',
            quantity: 'Quantity'
        }
    },
    resources: {
        customers: {
            name: 'Client |||| Clients',
            fields: {
                address: 'Rue',
                birthday: 'Anniversaire',
                city: 'Ville',
                commands: 'Commandes',
                first_name: 'Prénom',
                first_seen: 'Première visite',
                groups: 'Segments',
                has_newsletter: 'Abonné à la newsletter',
                has_ordered: 'A commandé',
                last_name: 'Nom',
                last_seen: 'Vu le',
                last_seen_gte: 'Vu depuis',
                latest_purchase: 'Dernier achat',
                name: 'Nom',
                total_spent: 'Dépenses',
                zipcode: 'Code postal',
            },
            tabs: {
                identity: 'Identité',
                address: 'Adresse',
                orders: 'Commandes',
                reviews: 'Commentaires',
                stats: 'Statistiques',
            },
            page: {
                delete: 'Supprimer le client',
            },
        },
        commands: {
            name: 'Commande |||| Commandes',
            fields: {
                basket: {
                    delivery: 'Frais de livraison',
                    reference: 'Référence',
                    quantity: 'Quantité',
                    sum: 'Sous-total',
                    tax_rate: 'TVA',
                    total: 'Total',
                    unit_price: 'P.U.',
                },
                customer_id: 'Client',
                date_gte: 'Passées depuis',
                date_lte: 'Passées avant',
                nb_items: 'Nb articles',
                reference: 'Référence',
                returned: 'Annulée',
                status: 'Etat',
                total_gte: 'Montant minimum',
            },
        },
        order: {
            name: 'Order |||| Orders',
            fields: {
                basket: {
                    delivery: 'Delivery',
                    reference: 'Reference',
                    quantity: 'Quantity',
                    sum: 'Sum',
                    tax_rate: 'Tax Rate',
                    total: 'Total',
                    unit_price: 'Unit Price',
                },
                customer_id: 'Customer',
                date_gte: 'Passed Since',
                date_lte: 'Passed Before',
                total_gte: 'Min amount',
                status: 'Status',
                returned: 'Returned',
                infoOrderLink: 'Link',
                idPackage: 'Package',
                channel: 'Channel',
                saleId: 'Sale Id',
            },
        },
        products: {
            name: 'Poster |||| Posters',
            fields: {
                category_id: 'Catégorie',
                height_gte: 'Hauteur mini',
                height_lte: 'Hauteur maxi',
                height: 'Hauteur',
                image: 'Photo',
                price: 'Prix',
                reference: 'Référence',
                stock_lte: 'Stock faible',
                stock: 'Stock',
                thumbnail: 'Aperçu',
                width_gte: 'Largeur mini',
                width_lte: 'Margeur maxi',
                width: 'Largeur',
                quantity: 'Quantity',
                product:'Product'
            },
            tabs: {
                image: 'Image',
                details: 'Détails',
                description: 'Description',
                reviews: 'Commentaires',
            },
        },
        categories: {
            name: 'Catégorie |||| Catégories',
            fields: {
                name: 'Nom',
                products: 'Produits',
            },
        },
        channels: {
            name: 'Channels',
            fields: {
                products: 'Products',
                name: 'Name',
            },
        },
        reviews: {
            name: 'Commentaire |||| Commentaires',
            fields: {
                customer_id: 'Client',
                command_id: 'Commande',
                product_id: 'Produit',
                date_gte: 'Publié depuis',
                date_lte: 'Publié avant',
                date: 'Date',
                comment: 'Texte',
                status: 'Statut',
                rating: 'Classement',
            },
            action: {
                accept: 'Accepter',
                reject: 'Rejeter',
            },
            notification: {
                approved_success: 'Commentaire approuvé',
                approved_error: 'Erreur: Commentaire non approuvé',
                rejected_success: 'Commentaire rejeté',
                rejected_error: 'Erreur: Commentaire non rejeté',
            },
        },
        segments: {
            name: 'Segments',
            fields: {
                customers: 'Clients',
                name: 'Nom',
            },
            data: {
                compulsive: 'Compulsif',
                collector: 'Collectionneur',
                ordered_once: 'A commandé',
                regular: 'Régulier',
                returns: 'A renvoyé',
                reviewer: 'Commentateur',
            },
        },
        user: {
            name: 'Users',
            fields: {
                customers: 'Users',
                name: 'Name',
            },
            data: {
                compulsive: 'Compulsive',
                collector: 'Collector',
                ordered_once: 'Ordered once',
                regular: 'Regular',
                returns: 'Returns',
                reviewer: 'Reviewer',
            },
        },
        account: {
            name: 'My Account',
            changePassword: "Change Password",
            fields: {
                username: 'User Name',
                name: 'Name',
                oldPassword: 'Old Password',
                newPassword: 'New Password'
            },
        },
    },
    commons: {
        roleAdmin: 'Admin(fr)',
        roleUser: 'User(fr)',
        roleManager: 'Manager(fr)',
        tokenExpired: 'Session is expired (fr)',
    }
};

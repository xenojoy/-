/*
 ██████╗ ██╗      █████╗  ██████╗███████╗██╗   ██╗████████╗
██╔════╝ ██║     ██╔══██╗██╔════╝██╔════╝╚██╗ ██╔╝╚══██╔══╝
██║  ███╗██║     ███████║██║     █████╗   ╚████╔╝    ██║   
██║   ██║██║     ██╔══██║██║     ██╔══╝    ╚██╔╝     ██║   
╚██████╔╝███████╗██║  ██║╚██████╗███████╗   ██║      ██║   
 ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝   ╚═╝      ╚═╝   

-------------------------------------
📡 Discord : https://discord.gg/xQF9f9yUEM
🌐 Website : https://glaceyt.com
🎥 YouTube : https://youtube.com/@GlaceYT
✅ Verified | 🧩 Tested | ⚙️ Stable
-------------------------------------
> © 2025 GlaceYT.com | All rights reserved.
*/

const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const aiManager = require('../../utils/AIManager');

const cache = new Map();
const CACHE_TTL = 600000; 

function getCache(key) {
    const item = cache.get(key);
    if (!item || Date.now() - item.time > CACHE_TTL) {
        cache.delete(key);
        return null;
    }
    return item.data;
}

function setCache(key, data) {
    cache.set(key, { data, time: Date.now() });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('food')
        .setDescription('🍴 AI Food Assistant - Complete Cooking & Nutrition Helper')
        .addSubcommand(sub => sub
            .setName('recipe')
            .setDescription('Get any recipe from AI')
            .addStringOption(opt => opt.setName('dish').setDescription('What dish do you want to cook?').setRequired(true))
            .addStringOption(opt => opt.setName('difficulty').setDescription('Cooking level').addChoices(
                { name: 'Easy', value: 'easy' },
                { name: 'Medium', value: 'medium' },
                { name: 'Hard', value: 'hard' }
            )))
        .addSubcommand(sub => sub
            .setName('nutrition')
            .setDescription('Get nutrition facts for any food')
            .addStringOption(opt => opt.setName('food').setDescription('Food item or meal').setRequired(true))
            .addIntegerOption(opt => opt.setName('amount').setDescription('Amount in grams (default: 100g)').setMinValue(1)))
        .addSubcommand(sub => sub
            .setName('substitute')
            .setDescription('Find ingredient substitutes')
            .addStringOption(opt => opt.setName('ingredient').setDescription('Ingredient to substitute').setRequired(true))
            .addStringOption(opt => opt.setName('reason').setDescription('Why substitute?').addChoices(
                { name: 'Allergic', value: 'allergy' },
                { name: 'Dont have it', value: 'missing' },
                { name: 'Healthier option', value: 'health' },
                { name: 'Diet restriction', value: 'diet' }
            )))
        .addSubcommand(sub => sub
            .setName('chef')
            .setDescription('Ask AI chef any cooking question')
            .addStringOption(opt => opt.setName('question').setDescription('Your cooking question').setRequired(true)))
        .addSubcommand(sub => sub
            .setName('mealplan')
            .setDescription('Generate meal plan')
            .addStringOption(opt => opt.setName('goal').setDescription('Your goal').setRequired(true).addChoices(
                { name: 'Weight Loss', value: 'weightloss' },
                { name: 'Muscle Gain', value: 'muscle' },
                { name: 'Healthy Eating', value: 'healthy' },
                { name: 'Quick Meals', value: 'quick' }
            ))
            .addIntegerOption(opt => opt.setName('days').setDescription('How many days?').setMinValue(1).setMaxValue(7)))
        .addSubcommand(sub => sub
            .setName('calories')
            .setDescription('Calculate calories for a meal')
            .addStringOption(opt => opt.setName('meal').setDescription('Describe your meal').setRequired(true)))
        .addSubcommand(sub => sub
            .setName('ingredients')
            .setDescription('Learn about any ingredient')
            .addStringOption(opt => opt.setName('ingredient').setDescription('Ingredient to learn about').setRequired(true)))
        .addSubcommand(sub => sub
            .setName('diet')
            .setDescription('Diet-specific meal suggestions')
            .addStringOption(opt => opt.setName('type').setDescription('Diet type').setRequired(true).addChoices(
                { name: 'Keto', value: 'keto' },
                { name: 'Vegan', value: 'vegan' },
                { name: 'Vegetarian', value: 'vegetarian' },
                { name: 'Mediterranean', value: 'mediterranean' },
                { name: 'Low Carb', value: 'lowcarb' },
                { name: 'High Protein', value: 'highprotein' }
            ))
            .addStringOption(opt => opt.setName('meal').setDescription('Meal type').addChoices(
                { name: 'Breakfast', value: 'breakfast' },
                { name: 'Lunch', value: 'lunch' },
                { name: 'Dinner', value: 'dinner' },
                { name: 'Snack', value: 'snack' }
            )))
        .addSubcommand(sub => sub
            .setName('pairing')
            .setDescription('Find what pairs with your food')
            .addStringOption(opt => opt.setName('food').setDescription('Food to pair').setRequired(true))
            .addStringOption(opt => opt.setName('type').setDescription('Pairing type').addChoices(
                { name: 'Food Combinations', value: 'food' },
                { name: 'Wine Pairing', value: 'wine' },
                { name: 'Drink Pairing', value: 'drink' }
            )))
        .addSubcommand(sub => sub
            .setName('seasonal')
            .setDescription('Seasonal food recommendations')
            .addStringOption(opt => opt.setName('season').setDescription('Season').setRequired(true).addChoices(
                { name: 'Spring', value: 'spring' },
                { name: 'Summer', value: 'summer' },
                { name: 'Fall', value: 'fall' },
                { name: 'Winter', value: 'winter' }
            ))
            .addStringOption(opt => opt.setName('category').setDescription('Food category').addChoices(
                { name: 'Fruits', value: 'fruits' },
                { name: 'Vegetables', value: 'vegetables' },
                { name: 'Recipes', value: 'recipes' }
            )))
        .addSubcommand(sub => sub
            .setName('cuisine')
            .setDescription('Explore world cuisines')
            .addStringOption(opt => opt.setName('country').setDescription('Country/region cuisine').setRequired(true))
            .addStringOption(opt => opt.setName('dish_type').setDescription('Dish type').addChoices(
                { name: 'Appetizer', value: 'appetizer' },
                { name: 'Main Course', value: 'main' },
                { name: 'Dessert', value: 'dessert' },
                { name: 'Street Food', value: 'street' }
            )))
        .addSubcommand(sub => sub
            .setName('cooking-tips')
            .setDescription('Cooking techniques and tips')
            .addStringOption(opt => opt.setName('technique').setDescription('Technique or cooking problem').setRequired(true)))
        .addSubcommand(sub => sub
            .setName('safety')
            .setDescription('Food safety information')
            .addStringOption(opt => opt.setName('topic').setDescription('Safety topic').setRequired(true).addChoices(
                { name: 'Storage Tips', value: 'storage' },
                { name: 'Expiration Guide', value: 'expiration' },
                { name: 'Temperature Guide', value: 'temperature' },
                { name: 'Food Poisoning Prevention', value: 'prevention' }
            ))
            .addStringOption(opt => opt.setName('food').setDescription('Specific food (optional)')))
        .addSubcommand(sub => sub
            .setName('grocery')
            .setDescription('Smart grocery shopping help')
            .addStringOption(opt => opt.setName('task').setDescription('Grocery task').setRequired(true).addChoices(
                { name: 'Shopping List', value: 'list' },
                { name: 'Budget Planning', value: 'budget' },
                { name: 'Seasonal Guide', value: 'seasonal' },
                { name: 'Bulk Buying', value: 'bulk' }
            ))
            .addStringOption(opt => opt.setName('details').setDescription('Additional details'))
            .addIntegerOption(opt => opt.setName('budget').setDescription('Weekly budget')))
        .addSubcommand(sub => sub
            .setName('leftover')
            .setDescription('Creative leftover ideas')
            .addStringOption(opt => opt.setName('food').setDescription('Leftover food').setRequired(true))
            .addIntegerOption(opt => opt.setName('people').setDescription('People to feed').setMinValue(1)))
        .addSubcommand(sub => sub
            .setName('compare')
            .setDescription('Compare nutrition of foods')
            .addStringOption(opt => opt.setName('food1').setDescription('First food').setRequired(true))
            .addStringOption(opt => opt.setName('food2').setDescription('Second food').setRequired(true))
            .addStringOption(opt => opt.setName('food3').setDescription('Third food (optional)')))
        .addSubcommand(sub => sub
            .setName('meal-prep')
            .setDescription('Meal prep strategies')
            .addStringOption(opt => opt.setName('goal').setDescription('Prep goal').setRequired(true).addChoices(
                { name: 'Save Time', value: 'time' },
                { name: 'Save Money', value: 'money' },
                { name: 'Healthy Eating', value: 'health' },
                { name: 'Weight Goals', value: 'weight' }
            ))
            .addIntegerOption(opt => opt.setName('days').setDescription('Days to prep').setMinValue(1).setMaxValue(7)))
        .addSubcommand(sub => sub
            .setName('quick')
            .setDescription('Quick meal ideas')
            .addIntegerOption(opt => opt.setName('minutes').setDescription('Max cooking time').setRequired(true).setMinValue(5).setMaxValue(60))
            .addStringOption(opt => opt.setName('meal_type').setDescription('Meal type').addChoices(
                { name: 'Breakfast', value: 'breakfast' },
                { name: 'Lunch', value: 'lunch' },
                { name: 'Dinner', value: 'dinner' },
                { name: 'Snack', value: 'snack' }
            )))
        .addSubcommand(sub => sub
            .setName('allergy')
            .setDescription('Allergy-friendly recipes')
            .addStringOption(opt => opt.setName('allergens').setDescription('Allergens to avoid (comma separated)').setRequired(true))
            .addStringOption(opt => opt.setName('meal_type').setDescription('Meal type').addChoices(
                { name: 'Breakfast', value: 'breakfast' },
                { name: 'Lunch', value: 'lunch' },
                { name: 'Dinner', value: 'dinner' },
                { name: 'Snack', value: 'snack' },
                { name: 'Dessert', value: 'dessert' }
            ))),

    async execute(interaction) {
        try {
            await interaction.deferReply();
            const subcommand = interaction.options.getSubcommand();

            switch (subcommand) {
                case 'recipe':
                    await this.handleRecipe(interaction);
                    break;
                case 'nutrition':
                    await this.handleNutrition(interaction);
                    break;
                case 'substitute':
                    await this.handleSubstitute(interaction);
                    break;
                case 'chef':
                    await this.handleChef(interaction);
                    break;
                case 'mealplan':
                    await this.handleMealPlan(interaction);
                    break;
                case 'calories':
                    await this.handleCalories(interaction);
                    break;
                case 'ingredients':
                    await this.handleIngredients(interaction);
                    break;
                case 'diet':
                    await this.handleDiet(interaction);
                    break;
                case 'pairing':
                    await this.handlePairing(interaction);
                    break;
                case 'seasonal':
                    await this.handleSeasonal(interaction);
                    break;
                case 'cuisine':
                    await this.handleCuisine(interaction);
                    break;
                case 'cooking-tips':
                    await this.handleCookingTips(interaction);
                    break;
                case 'safety':
                    await this.handleSafety(interaction);
                    break;
                case 'grocery':
                    await this.handleGrocery(interaction);
                    break;
                case 'leftover':
                    await this.handleLeftover(interaction);
                    break;
                case 'compare':
                    await this.handleCompare(interaction);
                    break;
                case 'meal-prep':
                    await this.handleMealPrep(interaction);
                    break;
                case 'quick':
                    await this.handleQuick(interaction);
                    break;
                case 'allergy':
                    await this.handleAllergy(interaction);
                    break;
                default:
                    await interaction.editReply({ content: '❌ Unknown subcommand!' });
            }
        } catch (error) {
            console.error('Food command error:', error);
            await interaction.editReply({
                content: '❌ Food AI is temporarily unavailable. Try again in a moment!'
            });
        }
    },


    async handleRecipe(interaction) {
        const dish = interaction.options.getString('dish');
        const difficulty = interaction.options.getString('difficulty') || 'medium';
        
        const cacheKey = `recipe_${dish}_${difficulty}`;
        const cached = getCache(cacheKey);
        if (cached) {
            return await interaction.editReply({ embeds: [cached] });
        }

        const prompt = `Give me a ${difficulty} recipe for ${dish}. Format your response exactly like this:

**${dish.toUpperCase()} RECIPE**

🕐 **Prep Time:** [time]
👥 **Serves:** [number]
⭐ **Difficulty:** ${difficulty.toUpperCase()}

📝 **INGREDIENTS:**
- [ingredient 1]
- [ingredient 2]
[continue list]

🍳 **INSTRUCTIONS:**
1. [step 1]
2. [step 2]
[continue steps]

💡 **CHEF TIPS:**
[2-3 helpful cooking tips]

Keep it practical and easy to follow. No fluff, just the recipe.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 30000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle(`🍳 ${dish.charAt(0).toUpperCase() + dish.slice(1)} Recipe`)
                .setDescription(result.substring(0, 4000))
                .setColor(0x2ECC71)
                .setFooter({ text: '🤖 Generated by AI Chef' })
                .setTimestamp();

            setCache(cacheKey, embed);
            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Recipe AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't get recipe for "${dish}". Try a different dish name!`
            });
        }
    },

    async handleNutrition(interaction) {
        const food = interaction.options.getString('food');
        const amount = interaction.options.getInteger('amount') || 100;
        
        const cacheKey = `nutrition_${food}_${amount}`;
        const cached = getCache(cacheKey);
        if (cached) {
            return await interaction.editReply({ embeds: [cached] });
        }

        const prompt = `Provide nutrition facts for ${amount}g of ${food}. Format exactly like this:

**${food.toUpperCase()} - ${amount}g**

📊 **CALORIES & MACROS:**
🔥 Calories: [number] kcal
🍞 Carbs: [number]g
🥩 Protein: [number]g  
🥑 Fat: [number]g
🌾 Fiber: [number]g
🧂 Sugar: [number]g

⚡ **KEY VITAMINS & MINERALS:**
[List top 4-5 vitamins/minerals with amounts]

🏆 **HEALTH BENEFITS:**
• [benefit 1]
• [benefit 2]
• [benefit 3]

Just give accurate nutrition data, no extra text.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 25000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle(`📊 Nutrition Facts`)
                .setDescription(result.substring(0, 4000))
                .setColor(0x3498DB)
                .setFooter({ text: '🤖 AI Nutrition Analysis' })
                .setTimestamp();

            setCache(cacheKey, embed);
            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Nutrition AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't analyze nutrition for "${food}". Try being more specific!`
            });
        }
    },

    async handleSubstitute(interaction) {
        const ingredient = interaction.options.getString('ingredient');
        const reason = interaction.options.getString('reason') || 'missing';
        
        const reasonText = {
            'allergy': 'due to allergies',
            'missing': 'because I dont have it',
            'health': 'for a healthier option',
            'diet': 'due to dietary restrictions'
        };

        const cacheKey = `substitute_${ingredient}_${reason}`;
        const cached = getCache(cacheKey);
        if (cached) {
            return await interaction.editReply({ embeds: [cached] });
        }

        const prompt = `I need substitutes for ${ingredient} ${reasonText[reason]}. Format like this:

**🔄 SUBSTITUTES FOR ${ingredient.toUpperCase()}**

**🥇 BEST ALTERNATIVES:**
1. **[substitute 1]** - [ratio] - [why it works]
2. **[substitute 2]** - [ratio] - [why it works]
3. **[substitute 3]** - [ratio] - [why it works]

**⚠️ COOKING NOTES:**
• [important tip 1]
• [important tip 2]

**📝 QUICK TIPS:**
[1-2 helpful substitution tips]

Give practical substitutes that actually work in recipes.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 20000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle(`🔄 Ingredient Substitutes`)
                .setDescription(result.substring(0, 4000))
                .setColor(0xF39C12)
                .setFooter({ text: '🤖 AI Cooking Assistant' })
                .setTimestamp();

            setCache(cacheKey, embed);
            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Substitute AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't find substitutes for "${ingredient}". Try another ingredient!`
            });
        }
    },

    async handleChef(interaction) {
        const question = interaction.options.getString('question');
        
        const prompt = `You are a professional chef AI. Answer this cooking question: "${question}"

Be helpful, practical, and give actionable advice. If it's about:
- Techniques: Explain step by step
- Problems: Give solutions
- Ingredients: Explain uses and tips
- Equipment: Suggest alternatives
- Recipes: Provide quick guidance

Keep it conversational but informative. Use emojis to make it engaging.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 25000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle('👨‍🍳 AI Chef Response')
                .setDescription(result.substring(0, 4000))
                .setColor(0xE74C3C)
                .setFooter({ text: `Question: ${question}` })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Chef AI error:', error);
            await interaction.editReply({
                content: `❌ Chef AI couldn't answer that question. Try rephrasing it!`
            });
        }
    },

    async handleMealPlan(interaction) {
        const goal = interaction.options.getString('goal');
        const days = interaction.options.getInteger('days') || 3;
        
        const goalText = {
            'weightloss': 'weight loss (calorie deficit)',
            'muscle': 'muscle gain (high protein)',
            'healthy': 'general health (balanced)',
            'quick': 'quick & easy meals'
        };

        const cacheKey = `mealplan_${goal}_${days}`;
        const cached = getCache(cacheKey);
        if (cached) {
            return await interaction.editReply({ embeds: [cached] });
        }

        const prompt = `Create a ${days}-day meal plan for ${goalText[goal]}. Format like this:

**🍽️ ${days}-DAY MEAL PLAN - ${goal.toUpperCase()}**

${Array.from({length: days}, (_, i) => `
**DAY ${i + 1}:**
🌅 **Breakfast:** [meal]
🌞 **Lunch:** [meal]  
🌙 **Dinner:** [meal]
🍎 **Snack:** [healthy snack]
`).join('')}

**📋 GROCERY LIST:**
[List key ingredients needed]

**💡 MEAL PREP TIPS:**
• [tip 1]
• [tip 2]

Make meals practical and achievable. Include variety and nutrition.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 35000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle(`🍽️ ${days}-Day Meal Plan`)
                .setDescription(result.substring(0, 4000))
                .setColor(0x9B59B6)
                .setFooter({ text: `Goal: ${goalText[goal]}` })
                .setTimestamp();

            setCache(cacheKey, embed);
            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Meal plan AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't generate meal plan. Try again with different options!`
            });
        }
    },

    async handleCalories(interaction) {
        const meal = interaction.options.getString('meal');
        
        const prompt = `Calculate calories for this meal: "${meal}"

Break down the meal and estimate calories. Format like this:

**🔥 CALORIE BREAKDOWN - ${meal.toUpperCase()}**

**📝 MEAL COMPONENTS:**
• [ingredient/item 1]: ~[calories] kcal
• [ingredient/item 2]: ~[calories] kcal
• [ingredient/item 3]: ~[calories] kcal
[continue for all components]

**🎯 TOTAL ESTIMATED CALORIES: ~[total] kcal**

**📊 MACRO SPLIT:**
🍞 Carbs: ~[number]g ([percent]%)
🥩 Protein: ~[number]g ([percent]%)
🥑 Fat: ~[number]g ([percent]%)

**💡 NOTES:**
[Any important notes about the meal]

Be realistic with portions and give accurate estimates.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 25000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle('🔥 Calorie Calculator')
                .setDescription(result.substring(0, 4000))
                .setColor(0x1ABC9C)
                .setFooter({ text: 'Estimates based on typical portions' })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Calories AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't calculate calories for "${meal}". Describe it more specifically!`
            });
        }
    },

    async handleIngredients(interaction) {
        const ingredient = interaction.options.getString('ingredient');
        
        const cacheKey = `ingredient_${ingredient}`;
        const cached = getCache(cacheKey);
        if (cached) {
            return await interaction.editReply({ embeds: [cached] });
        }

        const prompt = `Tell me everything about ${ingredient} as an ingredient. Format like this:

**🥗 ${ingredient.toUpperCase()} - INGREDIENT GUIDE**

**📊 NUTRITION HIGHLIGHTS:**
[Key nutritional benefits]

**🍳 COOKING USES:**
• [use 1]: [how to use]
• [use 2]: [how to use]
• [use 3]: [how to use]

**🛒 BUYING & STORAGE:**
• **Selection:** [how to choose quality]
• **Storage:** [how to store and for how long]

**🤝 PAIRS WELL WITH:**
[List 4-5 foods that pair well]

**💡 COOKING TIPS:**
[2-3 practical cooking tips]

Keep it informative and practical.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 25000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle('🥗 Ingredient Guide')
                .setDescription(result.substring(0, 4000))
                .setColor(0x27AE60)
                .setFooter({ text: '🤖 AI Ingredient Expert' })
                .setTimestamp();

            setCache(cacheKey, embed);
            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Ingredients AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't find information about "${ingredient}". Try being more specific!`
            });
        }
    },

    async handleDiet(interaction) {
        const dietType = interaction.options.getString('type');
        const mealType = interaction.options.getString('meal') || 'any';
        
        const cacheKey = `diet_${dietType}_${mealType}`;
        const cached = getCache(cacheKey);
        if (cached) {
            return await interaction.editReply({ embeds: [cached] });
        }

        const mealText = mealType === 'any' ? 'meal ideas' : `${mealType} ideas`;

        const prompt = `Give me ${dietType} diet ${mealText}. Format like this:

**🥗 ${dietType.toUpperCase()} DIET - ${mealText.toUpperCase()}**

**🍽️ MEAL OPTIONS:**
1. **[meal 1]** - [brief description]
2. **[meal 2]** - [brief description] 
3. **[meal 3]** - [brief description]
4. **[meal 4]** - [brief description]
5. **[meal 5]** - [brief description]

**📋 KEY INGREDIENTS TO USE:**
• [ingredient 1] - [why good for this diet]
• [ingredient 2] - [why good for this diet]
• [ingredient 3] - [why good for this diet]

**⚠️ AVOID:**
[Foods to avoid on this diet]

**💡 DIET TIPS:**
[2-3 helpful tips for this diet]

Make suggestions practical and achievable.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 30000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle(`🥗 ${dietType.charAt(0).toUpperCase() + dietType.slice(1)} Diet Guide`)
                .setDescription(result.substring(0, 4000))
                .setColor(0x8E44AD)
                .setFooter({ text: '🤖 AI Diet Specialist' })
                .setTimestamp();

            setCache(cacheKey, embed);
            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Diet AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't generate ${dietType} diet suggestions. Try again!`
            });
        }
    },

    async handlePairing(interaction) {
        const food = interaction.options.getString('food');
        const pairingType = interaction.options.getString('type') || 'food';
        
        const cacheKey = `pairing_${food}_${pairingType}`;
        const cached = getCache(cacheKey);
        if (cached) {
            return await interaction.editReply({ embeds: [cached] });
        }

        const typeText = {
            'food': 'food combinations',
            'wine': 'wine pairings',
            'drink': 'drink pairings'
        };

        const prompt = `Suggest ${typeText[pairingType]} for ${food}. Format like this:

**🤝 PERFECT PAIRINGS FOR ${food.toUpperCase()}**

**🏆 TOP RECOMMENDATIONS:**
1. **[pairing 1]** - [why it works]
2. **[pairing 2]** - [why it works]
3. **[pairing 3]** - [why it works]
4. **[pairing 4]** - [why it works]
5. **[pairing 5]** - [why it works]

**🎯 FLAVOR PROFILE:**
[Describe the flavor profile of the main food]

**💡 PAIRING PRINCIPLES:**
[Explain why these pairings work]

**🍽️ SERVING SUGGESTIONS:**
[1-2 serving ideas]

Focus on practical pairings that enhance flavors.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 25000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle('🤝 Perfect Pairings')
                .setDescription(result.substring(0, 4000))
                .setColor(0xD35400)
                .setFooter({ text: '🤖 AI Pairing Expert' })
                .setTimestamp();

            setCache(cacheKey, embed);
            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Pairing AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't find pairings for "${food}". Try a different food!`
            });
        }
    },

    async handleSeasonal(interaction) {
        const season = interaction.options.getString('season');
        const category = interaction.options.getString('category') || 'recipes';
        
        const cacheKey = `seasonal_${season}_${category}`;
        const cached = getCache(cacheKey);
        if (cached) {
            return await interaction.editReply({ embeds: [cached] });
        }

        const prompt = `Give me ${season} ${category} recommendations. Format like this:

**🌿 ${season.toUpperCase()} ${category.toUpperCase()} GUIDE**

**🌟 TOP SEASONAL PICKS:**
1. **[item 1]** - [why perfect for this season]
2. **[item 2]** - [why perfect for this season]
3. **[item 3]** - [why perfect for this season]
4. **[item 4]** - [why perfect for this season]
5. **[item 5]** - [why perfect for this season]

**🌡️ SEASONAL BENEFITS:**
[Why eating seasonally in ${season} is good]

**🛒 SHOPPING TIPS:**
• [tip 1]
• [tip 2]

**💡 ${season.toUpperCase()} COOKING IDEAS:**
[2-3 seasonal cooking suggestions]

Focus on what's naturally in season and tastes best.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 25000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle(`🌿 ${season.charAt(0).toUpperCase() + season.slice(1)} Seasonal Guide`)
                .setDescription(result.substring(0, 4000))
                .setColor(0x16A085)
                .setFooter({ text: '🤖 AI Seasonal Expert' })
                .setTimestamp();

            setCache(cacheKey, embed);
            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Seasonal AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't get ${season} recommendations. Try again!`
            });
        }
    },

    async handleCuisine(interaction) {
        const country = interaction.options.getString('country');
        const dishType = interaction.options.getString('dish_type') || 'main';
        
        const cacheKey = `cuisine_${country}_${dishType}`;
        const cached = getCache(cacheKey);
        if (cached) {
            return await interaction.editReply({ embeds: [cached] });
        }

        const prompt = `Explore ${country} cuisine ${dishType} dishes. Format like this:

**🌍 ${country.toUpperCase()} CUISINE - ${dishType.toUpperCase()} DISHES**

**🍽️ SIGNATURE DISHES:**
1. **[dish 1]** - [brief description]
2. **[dish 2]** - [brief description]
3. **[dish 3]** - [brief description]
4. **[dish 4]** - [brief description]
5. **[dish 5]** - [brief description]

**🧂 KEY FLAVORS & INGREDIENTS:**
[Typical flavors, spices, and ingredients used]

**🍳 COOKING TECHNIQUES:**
[Common cooking methods in this cuisine]

**🥢 CULTURAL NOTES:**
[Interesting cultural facts about the cuisine]

**💡 TRY AT HOME:**
[1-2 tips for cooking this cuisine at home]

Focus on authentic, traditional dishes.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 30000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle(`🌍 ${country.charAt(0).toUpperCase() + country.slice(1)} Cuisine`)
                .setDescription(result.substring(0, 4000))
                .setColor(0xC0392B)
                .setFooter({ text: '🤖 AI World Cuisine Expert' })
                .setTimestamp();

            setCache(cacheKey, embed);
            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Cuisine AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't explore ${country} cuisine. Try a different country!`
            });
        }
    },

    async handleCookingTips(interaction) {
        const technique = interaction.options.getString('technique');
        
        const prompt = `Give me cooking tips about "${technique}". Format like this:

**🍳 COOKING GUIDE: ${technique.toUpperCase()}**

**📚 TECHNIQUE OVERVIEW:**
[What this technique is and when to use it]

**📝 STEP-BY-STEP:**
1. [step 1]
2. [step 2]
3. [step 3]
[continue as needed]

**⚠️ COMMON MISTAKES:**
• [mistake 1] - [how to avoid]
• [mistake 2] - [how to avoid]

**💡 PRO TIPS:**
• [expert tip 1]
• [expert tip 2]

**🛠️ EQUIPMENT NEEDED:**
[List necessary tools or equipment]

**🍽️ BEST USED FOR:**
[What foods/dishes this technique works best with]

Be practical and detailed for home cooks.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 30000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle('🍳 Cooking Technique Guide')
                .setDescription(result.substring(0, 4000))
                .setColor(0x34495E)
                .setFooter({ text: '🤖 AI Cooking Instructor' })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Cooking tips AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't get cooking tips for "${technique}". Try rephrasing!`
            });
        }
    },

    async handleSafety(interaction) {
        const topic = interaction.options.getString('topic');
        const specificFood = interaction.options.getString('food');
        
        const topicText = {
            'storage': 'food storage',
            'expiration': 'expiration dates',
            'temperature': 'temperature guidelines',
            'prevention': 'food poisoning prevention'
        };

        const foodText = specificFood ? ` for ${specificFood}` : '';
        
        const prompt = `Give me ${topicText[topic]} information${foodText}. Format like this:

**🛡️ FOOD SAFETY: ${topicText[topic].toUpperCase()}${foodText.toUpperCase()}**

**⚠️ KEY SAFETY RULES:**
• [rule 1]
• [rule 2]
• [rule 3]
• [rule 4]

**🌡️ TEMPERATURE GUIDELINES:**
[Relevant temperature information]

**⏰ TIME LIMITS:**
[How long foods last under different conditions]

**🚨 WARNING SIGNS:**
[Signs of spoilage or unsafe food]

**💡 SAFETY TIPS:**
• [practical tip 1]
• [practical tip 2]

**🏥 WHEN TO THROW AWAY:**
[Clear guidelines on when food is unsafe]

Focus on practical safety information for home kitchens.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 25000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle('🛡️ Food Safety Guide')
                .setDescription(result.substring(0, 4000))
                .setColor(0xE67E22)
                .setFooter({ text: '🤖 AI Food Safety Expert' })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Safety AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't get food safety information. Try again!`
            });
        }
    },

    async handleGrocery(interaction) {
        const task = interaction.options.getString('task');
        const details = interaction.options.getString('details');
        const budget = interaction.options.getInteger('budget');
        
        const taskText = {
            'list': 'shopping list generation',
            'budget': 'budget meal planning',
            'seasonal': 'seasonal shopping guide',
            'bulk': 'bulk buying tips'
        };

        const extraInfo = details ? ` Details: ${details}.` : '';
        const budgetInfo = budget ? ` Weekly budget: $${budget}.` : '';

        const prompt = `Help me with ${taskText[task]}.${extraInfo}${budgetInfo} Format like this:

**🛒 GROCERY HELPER: ${taskText[task].toUpperCase()}**

**📋 MAIN RECOMMENDATIONS:**
• [recommendation 1]
• [recommendation 2]
• [recommendation 3]
• [recommendation 4]
• [recommendation 5]

**💰 MONEY-SAVING TIPS:**
• [money tip 1]
• [money tip 2]

**📅 PLANNING ADVICE:**
• [planning tip 1]
• [planning tip 2]

**🛍️ SHOPPING STRATEGY:**
[Best practices for this type of shopping]

**⚠️ AVOID:**
[Common mistakes to avoid]

Make it practical for everyday grocery shopping.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 25000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle('🛒 Smart Shopping Guide')
                .setDescription(result.substring(0, 4000))
                .setColor(0x7F8C8D)
                .setFooter({ text: '🤖 AI Grocery Assistant' })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Grocery AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't help with grocery shopping. Try again!`
            });
        }
    },

    async handleLeftover(interaction) {
        const leftoverFood = interaction.options.getString('food');
        const people = interaction.options.getInteger('people') || 2;
        
        const prompt = `Give me creative ideas for leftover ${leftoverFood} that feeds ${people} people. Format like this:

**♻️ LEFTOVER MAGIC: ${leftoverFood.toUpperCase()}**

**🍽️ CREATIVE RECIPE IDEAS:**
1. **[recipe 1]** - [quick description]
2. **[recipe 2]** - [quick description]
3. **[recipe 3]** - [quick description]
4. **[recipe 4]** - [quick description]
5. **[recipe 5]** - [quick description]

**⚡ QUICK TRANSFORMATIONS:**
• [quick idea 1]
• [quick idea 2]
• [quick idea 3]

**🥪 ADD TO MAKE IT COMPLETE:**
[Ingredients to add to make a full meal]

**⏰ STORAGE REMINDER:**
[How long this leftover is safe to use]

**💡 CHEF'S SECRET:**
[Pro tip for making leftovers taste fresh]

Focus on easy, practical transformations.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 25000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle('♻️ Leftover Transformations')
                .setDescription(result.substring(0, 4000))
                .setColor(0x95A5A6)
                .setFooter({ text: '🤖 AI Leftover Expert' })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Leftover AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't find ideas for leftover "${leftoverFood}". Try being more specific!`
            });
        }
    },

    async handleCompare(interaction) {
        const food1 = interaction.options.getString('food1');
        const food2 = interaction.options.getString('food2');
        const food3 = interaction.options.getString('food3');
        
        const foods = food3 ? [food1, food2, food3] : [food1, food2];
        const foodList = foods.join(' vs ');

        const prompt = `Compare nutrition between ${foodList}. Format like this:

**⚖️ NUTRITION COMPARISON: ${foodList.toUpperCase()}**

${foods.map(food => `
**${food.toUpperCase()}:**
• Calories: [number] per 100g
• Protein: [number]g
• Carbs: [number]g
• Fat: [number]g
• Fiber: [number]g
• Key nutrients: [list top 3]`).join('\n')}

**🏆 WINNER BY CATEGORY:**
• **Lowest Calories:** [food]
• **Highest Protein:** [food]
• **Most Fiber:** [food]
• **Best Overall:** [food and why]

**🥗 HEALTH VERDICT:**
[Which is healthiest and why]

**💡 BOTTOM LINE:**
[Practical advice on when to choose each]

Use typical serving sizes and be accurate with numbers.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 30000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle('⚖️ Nutrition Comparison')
                .setDescription(result.substring(0, 4000))
                .setColor(0xF1C40F)
                .setFooter({ text: '🤖 AI Nutrition Analyst' })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Compare AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't compare these foods. Try different food names!`
            });
        }
    },

    async handleMealPrep(interaction) {
        const goal = interaction.options.getString('goal');
        const days = interaction.options.getInteger('days') || 5;
        
        const goalText = {
            'time': 'save time',
            'money': 'save money',
            'health': 'eat healthier',
            'weight': 'achieve weight goals'
        };

        const cacheKey = `mealprep_${goal}_${days}`;
        const cached = getCache(cacheKey);
        if (cached) {
            return await interaction.editReply({ embeds: [cached] });
        }

        const prompt = `Create a ${days}-day meal prep plan to ${goalText[goal]}. Format like this:

**📦 MEAL PREP PLAN: ${goalText[goal].toUpperCase()}**

**🍽️ ${days}-DAY MEAL SCHEDULE:**
${Array.from({length: days}, (_, i) => `
**Day ${i + 1}:**
• Breakfast: [prepped meal]
• Lunch: [prepped meal]
• Dinner: [prepped meal]`).join('')}

**👨‍🍳 PREP DAY STRATEGY:**
1. [prep step 1]
2. [prep step 2]
3. [prep step 3]
4. [prep step 4]

**📋 SHOPPING LIST:**
[Essential ingredients for the week]

**📦 STORAGE TIPS:**
• [storage tip 1]
• [storage tip 2]

**⏰ TIME BREAKDOWN:**
[How long prep day will take]

Focus on practical, achievable meal prep for busy people.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 35000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle('📦 Smart Meal Prep Plan')
                .setDescription(result.substring(0, 4000))
                .setColor(0x2980B9)
                .setFooter({ text: '🤖 AI Meal Prep Coach' })
                .setTimestamp();

            setCache(cacheKey, embed);
            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Meal prep AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't create meal prep plan. Try different options!`
            });
        }
    },

    async handleQuick(interaction) {
        const minutes = interaction.options.getInteger('minutes');
        const mealType = interaction.options.getString('meal_type') || 'any';
        
        const mealText = mealType === 'any' ? 'meal' : mealType;

        const prompt = `Give me ${mealText} ideas that take ${minutes} minutes or less. Format like this:

**⚡ ${minutes}-MINUTE ${mealText.toUpperCase()} IDEAS**

**🚀 LIGHTNING-FAST RECIPES:**
1. **[recipe 1]** (${Math.floor(minutes/2)} min) - [ingredients list]
2. **[recipe 2]** (${Math.floor(minutes*0.7)} min) - [ingredients list]
3. **[recipe 3]** (${minutes} min) - [ingredients list]
4. **[recipe 4]** (${Math.floor(minutes*0.8)} min) - [ingredients list]
5. **[recipe 5]** (${Math.floor(minutes*0.6)} min) - [ingredients list]

**🛒 PANTRY STAPLES TO KEEP:**
• [staple 1]
• [staple 2]
• [staple 3]

**⏰ TIME-SAVING HACKS:**
• [hack 1]
• [hack 2]

**🍽️ SERVING TIP:**
[How to make it feel like a complete meal]

Focus on realistic cooking times and common ingredients.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 25000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle(`⚡ ${minutes}-Minute Meal Ideas`)
                .setDescription(result.substring(0, 4000))
                .setColor(0xE74C3C)
                .setFooter({ text: '🤖 AI Quick Cook Assistant' })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Quick meals AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't generate ${minutes}-minute meal ideas. Try a different time!`
            });
        }
    },

    async handleAllergy(interaction) {
        const allergens = interaction.options.getString('allergens');
        const mealType = interaction.options.getString('meal_type') || 'any';
        
        const mealText = mealType === 'any' ? 'meal' : mealType;

        const prompt = `Give me ${mealText} recipes that avoid these allergens: ${allergens}. Format like this:

**🚫 ALLERGY-FREE ${mealText.toUpperCase()} RECIPES**
**Avoiding:** ${allergens.toUpperCase()}

**🍽️ SAFE RECIPE OPTIONS:**
1. **[recipe 1]** - [ingredients summary]
2. **[recipe 2]** - [ingredients summary]
3. **[recipe 3]** - [ingredients summary]
4. **[recipe 4]** - [ingredients summary]
5. **[recipe 5]** - [ingredients summary]

**✅ SAFE INGREDIENTS TO USE:**
• [safe ingredient 1]
• [safe ingredient 2]
• [safe ingredient 3]
• [safe ingredient 4]

**⚠️ HIDDEN SOURCES TO AVOID:**
• [hidden source 1]
• [hidden source 2]
• [hidden source 3]

**🛒 SHOPPING TIPS:**
• [label reading tip]
• [brand recommendation if applicable]

**💡 SUBSTITUTION IDEAS:**
[How to replace common allergenic ingredients]

Focus on naturally allergen-free options and safe substitutes.`;

        try {
            const response = await aiManager.generateContent(prompt, { timeout: 30000 });
            const result = response.text();

            const embed = new EmbedBuilder()
                .setTitle('🚫 Allergy-Free Recipes')
                .setDescription(result.substring(0, 4000))
                .setColor(0xA569BD)
                .setFooter({ text: '🤖 AI Allergy-Safe Chef' })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Allergy AI error:', error);
            await interaction.editReply({
                content: `❌ Couldn't generate allergy-free recipes. Try listing specific allergens!`
            });
        }
    }
};

/*
 ██████╗ ██╗      █████╗  ██████╗███████╗██╗   ██╗████████╗
██╔════╝ ██║     ██╔══██╗██╔════╝██╔════╝╚██╗ ██╔╝╚══██╔══╝
██║  ███╗██║     ███████║██║     █████╗   ╚████╔╝    ██║   
██║   ██║██║     ██╔══██║██║     ██╔══╝    ╚██╔╝     ██║   
╚██████╔╝███████╗██║  ██║╚██████╗███████╗   ██║      ██║   
 ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝   ╚═╝      ╚═╝   

-------------------------------------
📡 Discord : https://discord.gg/xQF9f9yUEM
🌐 Website : https://glaceyt.com
🎥 YouTube : https://youtube.com/@GlaceYT
✅ Verified | 🧩 Tested | ⚙️ Stable
-------------------------------------
> © 2025 GlaceYT.com | All rights reserved.
*/
